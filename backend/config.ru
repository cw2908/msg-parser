require 'bundler'

Bundler.require(:default, ENV['RACK_ENV'].to_sym)

require './dev_server_proxy';
require './app'

run App
