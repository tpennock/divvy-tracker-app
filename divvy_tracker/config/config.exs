# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :divvy_tracker,
  ecto_repos: [DivvyTracker.Repo]

# Configures the endpoint
config :divvy_tracker, DivvyTrackerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "2FffXreCBFIdstjqlTsGt9OJIRlUtT89v9XdoxA19ZQpjeUeu7XznxXp/pm8AzCJ",
  render_errors: [view: DivvyTrackerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: DivvyTracker.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
