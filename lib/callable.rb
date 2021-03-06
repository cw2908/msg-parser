# frozen_string_literal: true

require "active_support/concern"
module Callable
  extend ActiveSupport::Concern
  class_methods do
    def call(*args)
      new(*args).call
    end
  end
end
