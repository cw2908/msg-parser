# frozen_string_literal: true

require_relative "./lib/msg_reader.rb"
require "awesome_print"
require "securerandom"
require "sinatra/reloader" if development?
require "sinatra/cross_origin"
require 'net/http'
# myIP = Net::HTTP.get('ipecho.net', '/plain')
# puts "My IP: #{myIP}"

class App < Sinatra::Base
  set :bind, "0.0.0.0"

  configure :development do
    enable :logging, :dump_errors, :raise_errors
    set :logging, :true if development?
    register Sinatra::Reloader
  end
  configure do
    enable :cross_origin
  end
  before do
    response.headers["Access-Control-Allow-Origin"] = "*"
  end

  get "/" do
    puts "Hey"
    html = File.join("public",'out',"index.html")
    send_file File.join("public","index.html")
  end

  post "/msg" do
    puts "params: #{params.inspect}"
    tempfile = params.to_h.dig("file", "tempfile")
    puts "tempfile: #{tempfile.inspect}"
    if tempfile
      res = MsgReader.call(tempfile)
      ap res[:headers]
    else
      res = { error_message: "No .msg file detected" }
    end
    json res
  end

  options "*" do
    response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
    response.headers["Access-Control-Allow-Origin"] = "*"
    200
  end
end
