# WP-ID.org v2
https://wp-id.org

## Usage
* Install [Docker](https://docs.docker.com/engine/installation/) & [Docker Compose](https://docs.docker.com/compose/) and make sure you're able to run `hello-world`:
  ```bash
  docker run hello-world
  ```
* Clone this repo and enter the directory:
  ```bash
  git clone https://github.com/wp-id/site-v2.git wp-id.org
  cd wp-id.org
  ```
* Add `127.0.0.1 wp-id.local` to `/etc/hosts`
* Create an external docker network for the site:
  ```bash
  docker network create proxy
  ```
* Run the containers:
  ```bash
  ./bin/up -e dev
  ```
