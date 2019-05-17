# React Sinatra Example
An example app for using Sinatra with React and Webpack

* Webpack config for development and production
* Rack middleware to proxy `/packs` requests from Sinatra to `webpack-dev-server`
* Helper methods `javascript_pack_tag` and `stylesheet_pack_tag`

## Up & running
Clone the repo then

```
$ bundle install
$ yarn install
```

```
$ rackup
```
In another tab
```
$ yarn start
```
Webpack dev server will run on `http://localhost:3035`
