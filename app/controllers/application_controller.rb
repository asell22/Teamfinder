class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  

  def current_user
    User.find_by(id: session[:user_id])
  end

  helper_method :current_user

  private
    def require_signin!
      if current_user.nil?
        flash[:error] = "You need to sign in or up before continuing."
        redirect_to signin_url
      end
    end

    helper_method :require_signin!
end
