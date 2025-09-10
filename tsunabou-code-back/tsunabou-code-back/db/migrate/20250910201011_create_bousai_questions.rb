class CreateBousaiQuestions < ActiveRecord::Migration[7.1]
  def change
    create_table :bousai_questions do |t|

      t.text :question #質問内容だね
      t.string :answer #問題の解答

      t.timestamps #これcreated_at,update_atを自動で作成してくれる
    end
  end
end
