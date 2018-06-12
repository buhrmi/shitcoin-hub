class Order < ActiveRecord::Base
  belongs_to :user
  has_many :trades
  belongs_to :base_asset, class_name: 'Asset'
  belongs_to :quote_asset, class_name: 'Asset'

  after_initialize do
    self.id = SecureRandom.uuid unless self.id
  end
  
  before_save do
    self.filled_at = Time.now if self.filled? and not self.filled_at
  end


  def self.open
    where(cancelled_at: nil, filled_at: nil)
  end

  def self.matching(order)
    orders = Order.where(base_asset: order.base_asset, quote_asset: order.quote_asset)
    orders = orders.where(type: order.matching_types)
    
    if order.sell?
      orders = orders.where(direction: 'buy').order('rate DESC')
      orders = orders.where('rate >= ?', order.rate) if order.limit?
    else
      orders = orders.where(direction: 'sell').order('rate ASC')
      orders = orders.where('rate <= ?', order.price) if order.limit?
    end

    return orders
  end
  
  def process!
    matchingOrders = Order.open.matching(self)

    for matchingOrder in matchingOrders
      break if self.filled?
      self.match!(matchingOrder)
    end

    self.save!
  end

  def filled?
    if self.buy? && self.market?
      self.total_filled >= self.total
    else
      self.quantity_filled >= self.quantity
    end
  end

  def match!(otherOrder)
    neededQuantity = self.quantity - self.quantity_filled
    availableQuoteAsset = self.total - self.total_filled

    unitRate = self.market? ? otherOrder.rate : self.rate

    

    otherOrder.save!
  end

  def matching_types
    if self.market?
      ['limit']
    else
      ['market', 'limit']
    end
  end

  def limit?
    type == 'limit'
  end

  def market?
    type == 'market'
  end

  def sell?
    direction == 'sell'
  end

  def buy?
    direction == 'buy'
  end
end
