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


  # Reads body per content type
  # 
  #  => "text/plain: content\ntext/html: <html>...</html>"
  #
  def read_body
    email.body_to_mime.parts.map { |part| 
      [
        part.content_type,
        part.body.encode("UTF-8", "binary", invalid: :replace, undef: :replace, replace: "")
      ].join(": ")
    }.join("\n")
      #  .gsub('\n', "\n").gsub('\r', "\r").gsub('\t', "\t")
  end

  def email
    @email ||= Mapi::Msg.open @msg_file
  end


  def call
    {
      headers: map_headers,
      body: read_body.to_s
    }
  end
end
