# frozen_string_literal: true

module MsgReader
  def self.parse(tempfile)
    return { error: "No .msg file detected" } unless tempfile
    email = Mapi::Msg.open tempfile
    {
      headers: email.headers.inject({}) { |x, (k, v)| x["#{k}:"] = v; x },
      body: email.body_to_mime.to_s
    }
    rescue => e
      puts "Raised: #{e}"
      {
        error: "Invalid File, please select an .msg file",
        _error_details: "[#{e.class}]: #{e.inspect}"
      }
  end
end
