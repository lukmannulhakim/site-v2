# WP-ID.org v2
https://wp-id.org

## Usage
* Install [Docker](https://docs.docker.com/engine/installation/) & [Docker Compose](https://docs.docker.com/compose/) and make sure you're able to run `hello-world`:
  ```bash
  docker run hello-world
  ```
* Clone this repo and enter the directory:
  ```bash
  git clone --recursive https://github.com/wp-id/site-v2.git wp-id.org
  cd wp-id.org
  ```
* Copy the sample compose override config for dev environment. Feel free to edit the copied file to your liking:
  ```bash
  cp config/dev/docker-compose.override.yml-sample config/dev/docker-compose.override.yml
  ```
* Add `127.0.0.1 wp-id.local` to `/etc/hosts`
* Run the containers:
  ```bash
  ./bin/up -e dev -x webpack
  ```
