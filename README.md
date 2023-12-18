# Tech Challenge

## Features

- User Details Form: The homepage includes a button that triggers a modal with user details fields for users to complete.
- Protected Information Page: There is an Information page that serves as a protected route. Users must complete the user details form to access this page.

## Getting Started

To begin, follow these steps:

Run the development server:

`npm run dev`

### or

`yarn dev`

Open http://localhost:3000 in your browser to view the application.

Start exploring the features and functionalities provided in the application.

### Protected Route

The Information page is a protected route, and users need to "log in" by completing the user details form to access it. Attempting to access the Information page without completing the form will redirect users to the homepage.

## Technologies Used

The project uses Next.js, Typescript, Chakra UI, and Apollo Client to implement the user interface and handle GraphQL queries.

## Bugs/challenges found and fixed:

[x] Adding localStorage threw hydration errors, fixed with a useEffect after sleeping on it.
[x] WelcomeModal was _sometimes_ opening on return to Homepage from information page. Fixed by removing wrapping conditional, and adding onClose to onClick of the modal's 'Go to information page' link.
[x] Didnt have correct logged in rules, after adding name and leaving the job title blank, the app was still allowing access to edit and loggout button and the info page. Fixed by adding a loggedIn property to user
