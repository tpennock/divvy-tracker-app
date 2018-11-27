defmodule DivvyTrackerWeb.PageController do
  use DivvyTrackerWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
