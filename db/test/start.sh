#!/usr/bin/env bash

cd $(dirname $0)

docker build -t topo-testdb .
docker run --publish=7688:7687 topo-testdb
