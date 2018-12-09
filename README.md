# divvy-tracker-app

React-based, single-page app for categorizing transactions and keeping track of expenses.

## Feature Wish List

- graphs pulling from data
- Implement `react-redux` and all of its central state management goodness
- Unit tests (addNewTransaction, batchUpload, romanNumerals etc.)
- `/users` page with real data
- More documentation

## Technical Exercise

Create a simple budgeting application that allows users to enter and
categorize transactions so they can keep track of how they’re spending.
Use any technologies you feel best with, except we’d like you to use
either Elixir/Phoenix for the back-end or JavaScript/React for the
front-end (or both if that’s what you’re best with).

Additionally, choose at least one of the following features to implement
as well:
- An option to convert dollar amounts to Roman numerals
- .csv file upload for bulk transaction importing
- A graph or two to display expenses in an interesting way
- Filtering and sorting options for transaction data
Feel free to take liberties in the design of the app’s UI, data structures,
back-end processes, etc. More than anything we want you to show off
your technical chops, so don't worry about doing something odd or
contrived if it helps you demonstrate your abilities better.
Commit your code as you go to a git repo. When you’re finished, either
send a link to the hosted repo or zip the local repo folder and email it.
We'll want to verify that your solution works as intended, and then we'll
be looking more at the way you designed

## Getting Started

### Elixir

See instructions for <a href="https://elixir-lang.org/install.html">installing Elixir</a>

For Mac OS X:
`brew update`
`brew install elixir`

### Hex Package Manager and Phoenix

See instructions for <a href="https://hexdocs.pm/phoenix/installation.html">installing Hex and Phoenix</a>

`mix local.hex`
`mix archive.install hex phx_new 1.4.0`

### Node.js

See instructions for <a href="https://github.com/creationix/nvm">installing nvm and Node.js</a>

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
`nvm install node` or `nvm install 10.13.0`

## Develop

### Running the application

`cd divvy_tracker`

see */divvy_tracker/README.md* for Phoenix server commands