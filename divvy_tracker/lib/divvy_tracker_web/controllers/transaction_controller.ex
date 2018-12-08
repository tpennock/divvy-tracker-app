defmodule DivvyTrackerWeb.TransactionController do
  use DivvyTrackerWeb, :controller

  alias DivvyTracker.Expenses
  alias DivvyTracker.Expenses.Transaction

  def index(conn, _params) do
    transactions = Expenses.list_transactions()
    render(conn, "index.json", transactions: transactions)
  end

  def new(conn, _params) do
    changeset = Expenses.change_transaction(%Transaction{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"transaction" => transaction_params}) do
    case Expenses.create_transaction(transaction_params) do
      {:ok, transaction} ->
        # conn
        # |> put_flash(:info, "Transaction created successfully.")
        # |> redirect(to: Routes.transaction_path(conn, :show, transaction))
        transactions = Expenses.list_transactions()
        render conn, "index.json", transactions: transactions

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    transaction = Expenses.get_transaction!(id)
    render(conn, "show.json", transaction: transaction)
  end

  def edit(conn, %{"id" => id}) do
    transaction = Expenses.get_transaction!(id)
    changeset = Expenses.change_transaction(transaction)
    render(conn, "edit.html", transaction: transaction, changeset: changeset)
  end

  def update(conn, %{"id" => id, "transaction" => transaction_params}) do
    transaction = Expenses.get_transaction!(id)

    case Expenses.update_transaction(transaction, transaction_params) do
      {:ok, transaction} ->
        conn
        |> put_flash(:info, "Transaction updated successfully.")
        |> redirect(to: Routes.transaction_path(conn, :show, transaction))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", transaction: transaction, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    transaction = Expenses.get_transaction!(id)
    {:ok, _transaction} = Expenses.delete_transaction(transaction)

    conn
    |> put_flash(:info, "Transaction deleted successfully.")
    |> redirect(to: Routes.transaction_path(conn, :index))
  end
end
