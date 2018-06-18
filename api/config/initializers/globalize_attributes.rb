module TranslatesWithAccessors
  def translates(*params)
    options = params.extract_options!
    options.reverse_merge!(:globalize_accessors => true)
    accessors = options.delete(:globalize_accessors)
    super
    globalize_accessors if accessors
  end

end

class ActiveRecord::Base
  extend TranslatesWithAccessors
  
  def globalized_attributes
    Hash[self.class.globalize_attribute_names.map { |name| [name, self.send(name)] }]
  end

end