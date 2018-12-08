defmodule DivvyTracker.Expenses.Transaction do
  use Ecto.Schema
  import Ecto.Changeset

  schema "transactions" do
    field :amount, :decimal
    field :category, :string
    field :date, :date
    field :merchant, :string
    field :name, :string
    field :notes, :string

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:date, :name, :category, :merchant, :amount, :notes])
    |> validate_required([:date, :name, :category, :merchant, :amount, :notes])
  end
end
