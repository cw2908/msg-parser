# frozen_string_literal: true

require_relative "./callable.rb"
require "mapi/msg"


class MsgReader
  include Callable

  attr_accessor :msg_file, :email, :read_body, :map_headers

  def initialize(msg_file)
    puts "Initializing #{msg_file.inspect}"
    @msg_file = msg_file
    @msg_file.set_encoding("bom|utf-8")
  end

  def map_headers
    email.headers.to_h.inject({}) do |hsh, (key, value)|
      hsh[key] = value.join(" ")
      hsh
    end
  end

  def read_body
    begin
      body = email.body_to_mime.to_s
    rescue
      body = email.body_to_mime.body.to_s
    end
    body.gsub('\n', "\n")
        .gsub('\r', "\r").gsub('\t', "\t")
        .encode("UTF-8", "binary", invalid: :replace, undef: :replace, replace: "")
  end

  def email
    @email ||= Mapi::Msg.open @msg_file
  end


  def call
    {
      headers: map_headers,
      body: read_body
    }
  end
end
