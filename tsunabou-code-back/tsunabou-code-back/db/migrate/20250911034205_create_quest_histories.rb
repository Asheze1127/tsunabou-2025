class CreateQuestHistories < ActiveRecord::Migration[7.1]
  def change
    create_table :quest_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :date
      t.integer :number
      t.string :user_answer

      t.timestamps
    end
  end
end
