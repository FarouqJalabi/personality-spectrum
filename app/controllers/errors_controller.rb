class ErrorsController < ApplicationController
  def not_found
    render status: :not_found, layout: false
  end

  def internal_server_error
    render status: :internal_server_error, layout: false
  end

  def unprocessable_content
    render status: :unprocessable_content, layout: false
  end
end
