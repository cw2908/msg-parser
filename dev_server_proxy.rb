# frozen_string_literal: true

class DevServerProxy < Rack::Proxy
  DEV_SERVER_HOST = "localhost:3035"

  def perform_request(env)
    request = Rack::Request.new(env)

    if %r{^/packs}.match?(request.path_info)
      env["HTTP_HOST"] = DEV_SERVER_HOST
      env["SCRIPT_NAME"] = ""
      env["HTTP_COOKIE"] = ""
      super(env)
    else
      @app.call(env)
    end
  end
end
