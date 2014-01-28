package com.thoughtworks.spdylab.server;

import org.eclipse.jetty.jmx.MBeanContainer;
import org.eclipse.jetty.server.*;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.handler.RequestLogHandler;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.handler.StatisticsHandler;
import org.eclipse.jetty.spdy.server.NPNServerConnectionFactory;
import org.eclipse.jetty.spdy.server.SPDYServerConnectionFactory;
import org.eclipse.jetty.spdy.server.http.HTTPSPDYServerConnectionFactory;
import org.eclipse.jetty.spdy.server.http.PushStrategy;
import org.eclipse.jetty.spdy.server.http.ReferrerPushStrategy;
import org.eclipse.jetty.util.ssl.SslContextFactory;

import java.lang.management.ManagementFactory;
import java.util.TimeZone;

public class JettySpdyServer {

    private static final int HTTP_PORT = 8080;

    public static void main(String[] args) throws Exception {
        new JettySpdyServer().run(args);
    }

    private void run(String[] args) throws Exception {
        Server server = new Server();
        server.setDumpAfterStart(false);
        server.setDumpBeforeStop(false);

        // Setup JMX
        MBeanContainer mbeanContainer = new MBeanContainer(ManagementFactory.getPlatformMBeanServer());
        server.addBean(mbeanContainer);

        // Base HTTP configuration
        HttpConfiguration config = new HttpConfiguration();
        config.setSecurePort(8443);
        config.addCustomizer(new ForwardedRequestCustomizer());
        config.addCustomizer(new SecureRequestCustomizer());

        // A plain HTTP connector listening on port 8080
        HttpConnectionFactory http = new HttpConnectionFactory(config);
        ServerConnector httpConnector = new ServerConnector(server, http);
        httpConnector.setPort(HTTP_PORT);
        server.addConnector(httpConnector);

        SslContextFactory sslContextFactory = new SslContextFactory();
        sslContextFactory.setKeyStorePath(System.getenv("HOME") + "/.ssh/localhost.jks");
        sslContextFactory.setKeyStorePassword("password");
        // not supported by Wireshark for SSL/TLS decryption
        sslContextFactory.setExcludeCipherSuites(
                "TLS_DHE_DSS_WITH_AES_256_CBC_SHA256",  // DSS
                "TLS_DHE_DSS_WITH_AES_256_CBC_SHA",     // DSS
                "TLS_DHE_DSS_WITH_AES_128_CBC_SHA256",  // DSS
                "TLS_DHE_DSS_WITH_AES_128_CBC_SHA",     // DSS
                "SSL_DHE_DSS_WITH_3DES_EDE_CBC_SHA",    // DSS
                "TLS_RSA_WITH_NULL_SHA256",             // NULL
                "TLS_ECDHE_ECDSA_WITH_NULL_SHA",        // NULL
                "TLS_ECDHE_RSA_WITH_NULL_SHA",          // NULL
                "SSL_RSA_WITH_NULL_SHA",                // NULL
                "TLS_ECDH_ECDSA_WITH_NULL_SHA",         // NULL
                "TLS_ECDH_RSA_WITH_NULL_SHA",           // NULL
                "TLS_ECDH_anon_WITH_NULL_SHA",          // NULL
                "SSL_RSA_WITH_NULL_MD5"                 // NULL
        );

        // Setup the spdy/npn connector on port 10443
        ServerConnector httpsConnector = new ServerConnector(server, sslContextFactory);
        httpsConnector.setPort(8443);
        server.addConnector(httpsConnector);

        // Make sure that the required NPN implementations are available.
        SPDYServerConnectionFactory.checkNPNAvailable();

        PushStrategy pushStrategy = new ReferrerPushStrategy();
        HTTPSPDYServerConnectionFactory spdy2 = new HTTPSPDYServerConnectionFactory(2, config, pushStrategy);
        HTTPSPDYServerConnectionFactory spdy3 = new HTTPSPDYServerConnectionFactory(3, config, pushStrategy);

        NPNServerConnectionFactory npn = new NPNServerConnectionFactory(spdy3.getProtocol(), spdy2.getProtocol(), http.getProtocol());

        SslConnectionFactory ssl = new SslConnectionFactory(sslContextFactory, npn.getProtocol());

        // Setup the spdy/npn connector on port 10443
        ServerConnector spdyConnector = new ServerConnector(server, ssl, npn, spdy3, spdy2, http);
        spdyConnector.setPort(10443);
        server.addConnector(spdyConnector);

        // The following section adds handlers.
        // See: http://www.eclipse.org/jetty/documentation/current/advanced-embedding.html for details.

        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setResourceBase("../service/app/static");
        resourceHandler.setEtags(true);
        resourceHandler.setWelcomeFiles(new String[]{"index.html", "index.htm", "tw.html", "tw.htm"});
        server.setHandler(resourceHandler);

        RequestLogHandler requestLogHandler = new RequestLogHandler();
        Slf4jRequestLog requestLog = new Slf4jRequestLog();
        requestLog.setLogTimeZone(TimeZone.getDefault().getID());
        requestLogHandler.setRequestLog(requestLog);

        HandlerCollection handlers = new HandlerCollection();
        handlers.setHandlers(new Handler[]{resourceHandler, requestLogHandler});

        StatisticsHandler statisticsHandler = new StatisticsHandler();
        statisticsHandler.setHandler(handlers);
        server.setHandler(statisticsHandler);

        server.setStopAtShutdown(true);
        server.start();
        server.dumpStdErr();
        server.join();
    }
}
