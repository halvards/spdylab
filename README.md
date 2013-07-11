# spdylab

This is code for a lab exercise to explore the
[http://www.chromium.org/spdy](SPDY protocol).

There is also a [http://halvards.github.io/spdylab/](slide deck)
available for the associated brief presentation that accompanied the lab
exercises.

## Brief Explanation

The `config` directory contains scripts to add latency to the loopback
network interface (for localhost/127.0.0.1). This makes the simulation
of a remote server more realistic.

The scripts use the `tc` (traffic control) command available in the
[http://www.linuxfoundation.org/collaborate/workgroups/networking/netem](netem)
package for Linux and must be run as sudo. They have been tested on
Ubuntu 12.04.

The `service` directory contains an
[http://expressjs.com/](ExpressJS) server (based on
[http://nodejs.org/](NodeJS)) hosting static files (actually a copy of
the ThoughtWorks.com home page).

The implementation of the service is in the file
`service/app/js/service.js`.

To enable easy comparison of HTTP, HTTPS, SPDY, and SPDY with server
push, the server listens on multiple ports:

* HTTP: [http://localhost:8080/tw.html](http://localhost:8080/tw.html)
* HTTPS: [https://localhost:8443/tw.html](https://localhost:8443/tw.html)
* SPDY: [https://localhost:10443/tw.html](https://localhost:10443/tw.html)
* SPDY with server push: [https://localhost:10443/](https://localhost:10443/)

The NodeJS module dependencies are specified in the file
`service/package.json`, and can be installed using `npm install`.

## Certificates and Keys

As SPDY requires SSL, the server looks for a private key and public key
certificate for the server in the directory `service/app/ssh`, and the
public key certificate of the certificate authority (CA) that issued the
server public key certificate in the directory `service/app/ca`. If you
already have your own local CA (recommended) then you can symlink these
to the existing locations.

## Virtual Machine

As the setup is quite involved (certificates, keys in Wireshark, traffic
control scripts), a Vagrant-based Ubuntu virtual machine was created for
this lab exercise. It can be found here, called `lab`:
[https://github.com/halvards/vagrant-vm](https://github.com/halvards/vagrant-vm).

