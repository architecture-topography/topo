<p align="right">
  <img align="right" src="https://circleci.com/gh/architecture-topography/topo.svg?style=svg&circle-token=2e4d21d7c386a802037b25ff4fd198899628c955" />
</p>
<br />

<p align="center">
  <img align="center" src="client/src/resources/img/Topo-02.png" width="350" alt="TOPO" />
</p>


<br/>

## Description
> Topo is a living, interactive, queryable visual map of an organisation's software systems - what they are, how they are grouped together, and how they relate to each other.<br/><br/>Topo has two major components - 1) the rumour-mill: an automated aggregator that can combine together multiple overlapping sources of data to build a trustworthy repository of system information.  These might include traditional CMDBs, service registries, even source repositories and monitoring tools.  Also 2) a visualisation tool that allows users to interactively navigate the system information and answer questions.

## Starting topo locally
The project is split into Client, Server and Database. There is a docker compose file to spin an instance for all of them up:

```
yarn docker-local up
```

The client starts up on http://localhost:5000
The server on http://localhost:4000
The database browser interface on http://localhost:7474/browser/

This also starts a second instance of the database (starting on :7473, but not exposed) that is used when running integration tests.
This is done because NEO doesn't support the concept of multiple databases on the same server and we want to setup and tear down the database components on each test run.


### Development Setup
It's very slow and inconvenient to have to re-build the docker images every time
you make a change. So instead we recommend running the client in dev mode
locally. This allows you to make use of hot-reloading and all that
good stuff.

First, run
```
yarn docker-dev up
```
Then, change to the "client" directory and run:
```yarn install``` 
to install all the dependencies followed by
```yarn start``` to start the client in dev mode on http://localhost:3000/

To **bootstrap the database**: follow the instructions in [db/seedDb.txt](db/seedDb.txt).

### Test
Use `yarn test` to launch the unit test runner. `yarn test-int` will run the integration tests.

## [wiki](https://github.com/architecture-topography/topo/wiki)
More information on the different topics.

## Decision Register

We document our decisions in the *doc/adr/* directory. Use [adr-tools](https://github.com/npryce/adr-tools) to automate creating a new decision register file for your decision. More details in the [wiki](https://github.com/architecture-topography/topo/wiki/decision-register).

## License

Topo is released under [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## Copyright

Copyright 2018 ThoughtWorks, Inc.
