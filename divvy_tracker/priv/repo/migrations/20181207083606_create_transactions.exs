defmodule DivvyTracker.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions) do
      add :date, :string
      add :name, :string
      add :category, :string
      add :merchant, :string
      add :amount_cents, :integer
      add :notes, :string

      timestamps()
    end

  end
end
