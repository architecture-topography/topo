#  TOPO

## Description
At a number of clients we're doing serious Enterprise Architecture (in title case), in particular helping with the establishment of a town plan - business capability model, mapped to systems, data, ownership, health, dependencies and other attributes.

## Development
The project is split into Client, Server and Database. There is a docker compose file to spin an instance for all of them up.
```
yarn docker-dev up
``` 
The client starts up under http://localhost:5000

The server http://localhost:4000

The database browser interface http://localhost:7474/browser/

### Setup Client locally 
It's very slow and inconvenient to have to re-build the docker images every time
you make a change. So instead we recommend running the client in dev mode
locally. This means that you end up with two versions of the client (on ports
5000 and 3000) but with the added convenience of hot-reloading and all that
good stuff.

Go into client folder
Run `yarn install` to install all the dependencies

### Test
Use `yarn test` to launch the test runner in the interactive watch mode.

## GitLab Runner

The CI for the project is configured to use [GitLab Runner](https://docs.gitlab.com/runner/), which (initially) can be run locally as follows:

```
sudo curl --output /usr/local/bin/gitlab-ci-multi-runner https://gitlab-ci-multi-runner-downloads.s3.amazonaws.com/v1.11.2/binaries/gitlab-ci-multi-runner-darwin-386
sudo chmod +x /usr/local/bin/gitlab-ci-multi-runner
```

Then registered as follows (using instructions from the [Runners](https://git.thoughtworks.net/topo/treasure-map/runners) page):

```
/usr/local/bin/gitlab-ci-multi-runner register
```

You can run the build server as follows:

```
/usr/local/bin/gitlab-ci-multi-runner run
```

## Deployment (old)

After running `yarn build`, the artifact can be deployed to an AWS S3 bucket for example. At runtime, the app will need two files to be loaded:
- `config.json`: this file contains the initial mapping between `Platforms` -> `Domains` -> `Capabilities`
- `assets.json`: this file is bundled with all the systems matching each capability

Both files must be located in the root folder of the project (e.g. `/build`). Deployment options can be found at [deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment).

## License

Topo is released under [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## Copyright

Copyright 2018 ThoughtWorks, Inc.
