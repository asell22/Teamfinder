class Bar < ActiveRecord::Base
  has_many :teams, dependent: :delete_all
end
