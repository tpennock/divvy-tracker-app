defmodule DivvyTracker.Expenses.Transaction do
  use Ecto.Schema
  import Ecto.Changeset


  schema "transactions" do
    field :amount_cents, :integer
    field :category, :string
    field :date, :string
    field :merchant, :string
    field :name, :string
    field :notes, :string

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:date, :name, :category, :merchant, :amount_cents, :notes])
    |> validate_required([:date, :name, :category, :merchant, :amount_cents, :notes])
  end
end
