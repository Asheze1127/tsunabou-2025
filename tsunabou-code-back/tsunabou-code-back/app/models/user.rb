# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  include DeviseTokenAuth::Concerns::User

  validates :pic_id, presence: true
  validates :score, numericality: { only_integer: true }
end
