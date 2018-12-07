defmodule DivvyTracker.ExpensesTest do
  use DivvyTracker.DataCase

  alias DivvyTracker.Expenses

  describe "transactions" do
    alias DivvyTracker.Expenses.Transaction

    @valid_attrs %{amount_cents: 42, category: "some category", date: "some date", merchant: "some merchant", name: "some name", notes: "some notes"}
    @update_attrs %{amount_cents: 43, category: "some updated category", date: "some updated date", merchant: "some updated merchant", name: "some updated name", notes: "some updated notes"}
    @invalid_attrs %{amount_cents: nil, category: nil, date: nil, merchant: nil, name: nil, notes: nil}

    def transaction_fixture(attrs \\ %{}) do
      {:ok, transaction} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Expenses.create_transaction()

      transaction
    end

    test "list_transactions/0 returns all transactions" do
      transaction = transaction_fixture()
      assert Expenses.list_transactions() == [transaction]
    end

    test "get_transaction!/1 returns the transaction with given id" do
      transaction = transaction_fixture()
      assert Expenses.get_transaction!(transaction.id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction" do
      assert {:ok, %Transaction{} = transaction} = Expenses.create_transaction(@valid_attrs)
      assert transaction.amount_cents == 42
      assert transaction.category == "some category"
      assert transaction.date == "some date"
      assert transaction.merchant == "some merchant"
      assert transaction.name == "some name"
      assert transaction.notes == "some notes"
    end

    test "create_transaction/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Expenses.create_transaction(@invalid_attrs)
    end

    test "update_transaction/2 with valid data updates the transaction" do
      transaction = transaction_fixture()
      assert {:ok, %Transaction{} = transaction} = Expenses.update_transaction(transaction, @update_attrs)
      assert transaction.amount_cents == 43
      assert transaction.category == "some updated category"
      assert transaction.date == "some updated date"
      assert transaction.merchant == "some updated merchant"
      assert transaction.name == "some updated name"
      assert transaction.notes == "some updated notes"
    end

    test "update_transaction/2 with invalid data returns error changeset" do
      transaction = transaction_fixture()
      assert {:error, %Ecto.Changeset{}} = Expenses.update_transaction(transaction, @invalid_attrs)
      assert transaction == Expenses.get_transaction!(transaction.id)
    end

    test "delete_transaction/1 deletes the transaction" do
      transaction = transaction_fixture()
      assert {:ok, %Transaction{}} = Expenses.delete_transaction(transaction)
      assert_raise Ecto.NoResultsError, fn -> Expenses.get_transaction!(transaction.id) end
    end

    test "change_transaction/1 returns a transaction changeset" do
      transaction = transaction_fixture()
      assert %Ecto.Changeset{} = Expenses.change_transaction(transaction)
    end
  end
end
