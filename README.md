# Shuttle Logistics

Innovative fully automated logistics company

## Getting started

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) for Mac or Windows. [Docker Compose](https://docs.docker.com/compose) will be automatically installed. On Linux, make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/). 

## Installation

Run in the root directory:

```
docker-compose up
```

The server app will be running at [http://localhost:3000](http://localhost:3000), and the client will be at [http://localhost:3001](http://localhost:3001).

## Architecture

![Architecture](../media/architecture.png?raw=true)

## Project Structure

* __client-app__
  * public _(favicon)_
  * __src__
    * __admin__
      * components
      * services
      * styles
    * assets _(images & logos)_
    * components _(global)_
    * contexts
    * helpers _(unclassified)_
    * models
    * __pages__
      * Admin
      * Auth
      * ErrorPages
      * Index
      * Orders
      * Profile
    * services
    * stores
    * styles
    * App.tsx
    * app.scss _(global styles)_
  * _configs_
* __server-app__
  * data _(data init templates)_
  * __src__
    * __components__
      * auth
      * locations
      * orders
      * time
      * users
      * vehicles
    * helpers _(useful files)_
    * models
    * schemas _(mongoose)_
  * initMongo.ts _(mongo initializer)_
  * _configs_

## Structural Scheme

![Structural Scheme](../media/scheme.png?raw=true)

## Technologies

![Technologies](../media/technologies.png?raw=true)

## Theme

![Theme](../media/theme.png?raw=true)