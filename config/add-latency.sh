#!/bin/sh
/sbin/tc qdisc add dev lo root netem delay 100ms

