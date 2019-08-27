# frozen_string_literal: true

require "mapi/msg"
require "securerandom"
require_relative "./lib/msg_reader.rb"
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

  get "/" do
    erb :app
  end

  post "/msg" do
    tempfile = params.to_h.dig("file", "tempfile")
    json MsgReader.parse(tempfile)
  end
end
