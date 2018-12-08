defmodule DivvyTrackerWeb.TransactionView do
  use DivvyTrackerWeb, :view
  
  # show all transactions
  def render("index.json", %{transactions: transactions}) do
    %{
      transactions: Enum.map(transactions, &transactions_json/1)
    }
  end

  def transactions_json(transaction) do
    %{
      id: transaction.id,
      name: transaction.name,
      date: transaction.date,
      category: transaction.category,
      merchant: transaction.merchant,
      amount: transaction.amount,
      notes: transaction.notes
    }
  end

  # show single blog
  def render("show.json", %{transaction: transaction}) do
    %{
      transaction: transactions_json(transaction)
    }
  end

end
