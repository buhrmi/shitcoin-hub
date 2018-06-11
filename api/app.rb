require "sinatra/base"
require "sinatra/activerecord"
require "sinatra/reloader"

# Load ActiveRecord Models
Dir[File.join(__dir__, 'models', '*.rb')].each { |file| require file }

class App < Sinatra::Base
  register Sinatra::ActiveRecordExtension
  register Sinatra::Reloader if development?

  helpers do
    def current_user
      @user ||= User.joins(:authorizations).where('authorizations.token' => request.env[:authorization]).first
    end

    def protected!
      return if current_user
      halt 401, 'Not authorized/n'
    end
  end

  get '/' do
    'Welcome to the world of shitcoins'
  end

  post '/assets' do
    protected!

  end

  get '/assets' do
    protected!

  end
end