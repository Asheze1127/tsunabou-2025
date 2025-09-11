class CreateImages < ActiveRecord::Migration[7.1]
  def change
    create_table :images do |t|

      t.references :user, null: false, foreign_key: true
      t.text :image_url
      t.integer :sort_order
      t.timestamps
    end
  end
end
