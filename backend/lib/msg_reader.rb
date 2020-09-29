# frozen_string_literal: true
require_relative './callable.rb'

class MsgReader
  include Callable


  def map_headers
    email.headers
      .inject({}) { |hsh, (header, value)| hsh["#{header}:"] = value; hsh }
  end

  def read_body
    begin
      email.body_to_mime.to_s
    rescue
      email.body_to_mime.body
    end
  end

  def initialize(msg_file)
    @msg_file = msg_file
    @msg_file.set_encoding('bom|utf-8')
  end

  def email
    @email ||= Mapi::Msg.open @msg_file
  end


  def call()
    return {
        headers: map_headers,
        body: read_body,
      }
    rescue => e
      puts "Raised: #{e}"
      {
        error: "Invalid File, please select an .msg file",
        _error_details: "[#{e.class}]: #{e.inspect}"
      }
  end
end
