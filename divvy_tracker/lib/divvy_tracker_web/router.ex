defmodule DivvyTrackerWeb.Router do
  use DivvyTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # api stack
  scope "/api", DivvyTrackerWeb do
    pipe_through :api

    # resources "/transactions", TransactionController
    get "/transactions", TransactionController, :index
    get "/transactions/:id/edit", TransactionController, :edit
    get "/transactions/new", TransactionController, :new
    get "/transactions/:id", TransactionController, :show
    post "/transactions", TransactionController, :create
    post "/transactions/batch", TransactionController, :create_batch
    put "/transactions/:id", TransactionController, :update
    delete "/transactions/:id", TransactionController, :delete
  end

  # application stack
  scope "/", DivvyTrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
