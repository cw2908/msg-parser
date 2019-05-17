require 'awesome_print'
require 'mapi/msg'
require 'lib/file_persist'
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

  # get '/products' do
  #   products = [
  #     { id: 1, name: 'cerulean', year: 2000, color: '#98B2D1', pantone_value: '15-4020' },
  #     { id: 2, name: 'fuchsia rose', year: 2001, color: '#C74375', pantone_value: '17-2031' },
  #     { id: 3, name: 'true red', year: 2002, color: '#BF1932', pantone_value: '19-1664' }
  #   ]

  #   json products
  # end

  post '/msg' do
    ap params
    tempfile = params.to_h.dig('file','tempfile')
    ObjectSpace.undefine_finalizer(tempfile)
    filename = params.to_h.dig('file','filename')
    
    if tempfile
      begin
        puts "tempfile.path: #{tempfile.path}"
        f = File.copy(tempfile.path, "./tmp/#{filename}")
        puts "f: #{f}"
        email = Mapi::Msg.open f.path
        puts "email: #{email}"
        email_headers = email.headers
        puts "email_headers: #{email_headers}"
        json email_headers
      # rescue => e
        # puts "Error: #{e}"
        # json ['Error!',e.inspect]
      end
    else
      puts "No File Detected: #{file}"
      puts "params: #{params.inspect}"
    end
  end
end
