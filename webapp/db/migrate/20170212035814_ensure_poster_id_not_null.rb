class EnsurePosterIdNotNull < ActiveRecord::Migration[5.0]
  def change
      change_column_null :locations, :posterid, false
  end
end
