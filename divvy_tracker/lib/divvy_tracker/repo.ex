defmodule DivvyTracker.Repo do
  use Ecto.Repo,
    otp_app: :divvy_tracker,
    adapter: Ecto.Adapters.Postgres
end
