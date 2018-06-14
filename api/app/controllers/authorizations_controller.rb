class AuthorizationsController < ApplicationController
  def create
    if params[:signature]
      create_using_web3
    else
      create_using_email
    end
  end

  private
  def create_using_web3
    msg = 'shitcoin hub'
    prefix = "#{Eth::Utils.hex_to_bin('19')}Ethereum Signed Message:\n#{msg.length}"
    message_hash = Eth::Utils.keccak256("#{prefix}#{msg}")
    signature = Eth::Utils.hex_to_bin(params[:signature].gsub('0x', ''))
    signature2 = Eth::Utils.hex_to_bin(params[:signature])
    public_hex = Eth::OpenSsl.recover_compact(message_hash, signature)
    user = User.where(eth_key: public_hex).first_or_create
    auth = Authorization.dummy
    auth.user = user
    auth.save!
    response.set_cookie :authorization, value: auth.token, httponly: true, secure: true
    render plain: auth.token
  end

  def create_using_email
    user = User.where(email: params['email']).first_or_create
    auth = Authorization.dummy
    auth.user = user
    auth.save!
    response.set_cookie :authorization, value: auth.token, httponly: true, secure: true
    render plain: auth.token
  end
end
