class QuestHistory < ApplicationRecord
  belongs_to :user
  
  validates :date, presence :true
  validates :number, presence :true
end
