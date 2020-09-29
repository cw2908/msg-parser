# frozen_string_literal: true

require "mapi/msg"
require "securerandom"
require "sinatra/reloader" if development?
require_relative "./lib/msg_reader.rb"
class App < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end


  get "/" do
    "Hello..."
  end

  post "/msg" do
    pp params
    tempfile = params.to_h.dig("file", "tempfile")
    puts "Tempfile: #{tempfile.inspect}"
    puts "Tempfile: #{tempfile.methods}"
    json tempfile ? MsgReader.call(tempfile) : { error: "No .msg file detected" }
  rescue StandardError => e
    puts "Error: #{e}"
    error_response = { 
      error_message: "Unexpected Error",
      error_info: e.inspect
    }.to_json
    puts "error_response: #{error_response}"
    error_response
  rescue => e
    puts "Error: #{e}"
  end
end
