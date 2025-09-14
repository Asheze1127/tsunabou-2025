class CreatePost < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|

      t.references :user, null: false, foreign_key: true
      t.text :content
      t.string :pic_id
      t.string :enum
      t.float :latitude
      t.float :longitude
      t.integer :favorite
      t.timestamps
    end
  end
end
