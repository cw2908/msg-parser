
require 'mapi/msg'
require 'securerandom'
class App < Sinatra::Base
  use DevServerProxy if development?

  helpers do
    def javascript_pack_tag(name)
      "<script src=\"/packs/#{name}.js\"></script>"
    end

    def stylesheet_pack_tag(name)
      if settings.environment == :production
        "<link rel=\"stylesheet\" href=\"/packs/#{name}.css\" />"
      end
    end
  end

  get '/' do
    erb :app
  end

  post '/msg' do
    tempfile = params.to_h.dig('file','tempfile')
    if tempfile
      begin
        email = Mapi::Msg.open tempfile
        email_headers = email.headers.inject({}) { |x, (k,v)| x["#{k}:"] = v; x }
        puts "email_headers: #{email_headers}"
        json email_headers
      rescue => e
        error_response = {Error: "Invalid File, please select an .msg file"}
        json error_response
        puts "Error: #{e}"
      end
    else
      puts "No File Detected: #{file}"
      puts "params: #{params.inspect}"
    end
  end
end
