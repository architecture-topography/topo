#  TOPO

## Description
At a number of clients we're doing serious Enterprise Architecture (in title case), in particular helping with the establishment of a town plan - business capability model, mapped to systems, data, ownership, health, dependencies and other attributes.

## Development

### Setup
Run `yarn install` to install all the dependencies

### Run
Use `yarn start` to run the app in the development mode.  

Open `http://localhost:3000` to view it in the browser.  
The page will reload if you make edits.  
You will also see any lint errors in the console.

### Build
Use `yarn build` to build the app for production to the build folder 

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
