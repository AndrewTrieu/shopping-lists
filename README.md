# Shared shopping list

## Overview

This web application allows users to create and manage shared shopping lists.
Users can create new shopping lists, add items to them, and mark items as
collected. The application displays a list of all active shopping lists, as well
as a page for each individual shopping list showing all its items.

The application is deployed at https://shopper.fly.dev/ using
[Fly.io](https://fly.io/). Feel free to try it out!

The web application is built using Deno, a JavaScript/TypeScript runtime with
built-in support for modern web development. The user interface is rendered
using the Eta template engine, which allows for embedding JavaScript code in
HTML templates. The application uses a Postgres database to store data about
shopping lists and items.

## Usage

To create a new shopping list, navigate to the "Shopping lists" page and enter a
name for the list in the "Name" field. Then, click the "Create!" button.

To add an item to a shopping list, navigate to the page for the list and enter
the item's name in the "Name" field. Then, click the "Add!" button.

To mark an item as collected, navigate to the page for the shopping list
containing the item and click the "Mark collected!" button next to the item.

To deactivate a shopping list, navigate to the page for the list and click the
"Deactivate list!" button. Deactivated lists will no longer appear on the
"Shopping lists" page.

## Additional functionality

The application also displays the total number of active shopping lists and
items on the main page.

The items in each shopping list are sorted by their collected status, with
collected items appearing at the bottom of the list.

The application is designed to be scalable and can handle multiple concurrent
connections. It uses a connection pool to manage connections to the database.

## File structure

- deps.js: file containing functions for starting the server and rendering
  templates
- controllers: directory containing files for handling different routes and
  their corresponding logic
  - mainController.js: file containing functions for handling the main page
    routes
  - listController.js: file containing functions for handling the shopping list
    routes
  - itemController.js: file containing functions for handling the shopping list
    item routes
- services: directory containing files for interacting with the database
  - mainService.js: file containing functions for interacting with the main page
    data
  - listService.js: file containing functions for interacting with the shopping
    list data
  - itemService.js: file containing functions for interacting with the shopping
    list item data
- database: directory containing the file for connecting to the database
  - database.js: file containing functions for executing queries on the database
- views: directory containing the templates for the different pages
  - layouts: directory containing the layout template
    - layout.eta: layout template for all pages
  - main.eta: template for the main page
  - lists.eta: template for the shopping lists page
  - list.eta: template for an individual shopping list page
- utils: directory containing utility functions
  - requestUtils.js: file containing functions for handling HTTP requests

## Testing

End-to-end tests are done using Playwright, which is located in the
`e2e-playwright` directory.

The tests are designed to ensure that the application behaves as expected when
creating, viewing, updating, and deleting a shopping list.

The first test, "Can create a new shopping list," verifies that a new shopping
list can be created by visiting the "/lists" page, filling out a form with the
name of the list, and submitting the form. The test then verifies that the list
appears on the page by checking for the presence of a link with the list's name.

The second test, "Can open a shopping list page," verifies that a shopping list
page can be opened by clicking on a link with the list's name on the "/lists"
page. The test then verifies that the page has the correct title by checking for
the presence of an h1 element with the list's name.

The third test, "Can add an item to a shopping list," verifies that an item can
be added to a shopping list by visiting the list page, filling out a form with
the item's name, and submitting the form. The test then verifies that the item
appears in the list by checking for the presence of a table cell with the item's
name.

The fourth test, "Can mark an item as collected," verifies that an item in a
shopping list can be marked as collected by clicking on a "Mark collected!"
button on the list page. The test then verifies that the item is marked as
collected by checking that the item's name appears as struck-through text (using
the del HTML tag) in the table cell.

The fifth test, "Can deactivate a shopping list," verifies that a shopping list
can be deactivated by clicking on a "Deactivate list!" button on the list page.
The test then verifies that the list is deactivated by checking that the link
with the list's name is no longer present on the page.

To run the tests, run the following commands:

`docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`

## Local deployment

To deploy the application locally, run `docker-compose up` in the root
directory.

## Notes

- When you access the application for the first time, it might display
  `Internal Server Error`. This is because Fly.io will spin up a new instance of
  the application for you and it needs a few seconds to start up. Subsequent
  requests will be much faster.
- Playwright tests might be able to start, due to connection errors created by
  Docker or Deno. If you encounter this issue, please try running it again.
