class Store < ApplicationRecord
  belongs_to :user

  validates :date, presence :true
  validates :text, presence :true
end
