# Simple Wordle

Wordle project bootstrapped using [Create React App](https://github.com/facebook/create-react-app).

## Demo application

A demo is accessible at [https://bagaze-wordle.herokuapp.com/](https://bagaze-wordle.herokuapp.com/)

## Prerequisites

[Docker](https://www.docker.com/get-started)

## Build and run

### Edit the configuration

You can set the number of tries and the backend API base URL in `./src/data/conf.json`

### To run locally

Clone the repository and perform the following commands:

```
yarn install
yarn run start
```

The app is available at [http://localhost:3000](http://localhost:3000)

### Through Docker

#### Development

Build the docker image

```
docker build -t baptistegaze/simple-wordle .
```

## Run

```
docker run -d --name simple-wordle -p 3000:3000 baptistegaze/simple-wordle
```

The app is available at [http://localhost:3000](http://localhost:3000)
