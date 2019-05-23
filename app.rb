
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
        json email_headers
      rescue => e
        puts "Error: #{e}"
        json ['Error!', e.inspect]
        raise e
      end
    else
      puts "No File Detected: #{file}"
      puts "params: #{params.inspect}"
    end
  end
end
