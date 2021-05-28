# TVShows

This Project is used to show TV Shows based on rating and genre. User can search tv shows.

### Features:

- [x] Initial Skelton and Setup of React Application.
- [x] Material UI for design.
- [x] React Hook methods.
- [x] useReducer and useContext methods for state management.
- [x] Created reusable components - ShowItem, TableItem, Header and SearchBar.
- [x] Three pages for navigation - Dashboard Page, Shows Page and Episodes Page.
- [x] Unit tests in jest.


## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [To Run Application](#to-run-application)
- [Run Tests](#run-tests)
- [ESlint](#eSlint)
- [About Application](#about-application)
- [Learn More](learn-more)

## General info

This project is to show TV Shows based on rating and genre and can search tv shows. I have used React hooks useReducer and useContext for state management. I have used Material UI library(that implement Google's Material Design) for the React components.

## Technologies

Project is created with:

- React: 17.0.2
- Material UI: 4.11.4
- React Router: 5.2.0

## Setup

To run this project, install it locally using npm:

```
$ cd ../TVShows
$ npm install

Installs all dependencies mentioned in package.json in project directory

TVShows/
  README.md
  node_modules/
  package.json
  public/
    index.html
  src/
    App.js
    App.test.js
    index.css
    index.js
  components/
    Header.js
    SearchBar.js
    ShowItem.js
    TableItem.js
  pages/
    Dashboardpage.js
    Episodepage.js
    NotFounfpage.js
    Showpage.js
  reducers/
    actions.js
    initialState.js
    reducer.js
    showContext.js
    State.js
    util.js
  services/
    baseService.js
    serviceEndpoints.js
    tvShowServices.js
```

# To Run Application

```
$ npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
```

# Run Tests

```
$ npm test
$ npm test -- --coverage --watchAll

To run the unit tests and to check the code coverage.
```

# ESlint

```
$ npm run lint
$ npm run lint:fix
ESlint is used for code quality and fixing styling issues.
it generates eslintrc.js file once you run lint command.
```

# About Application

```
This Application is developed by using React Hooks methods. For state management, I used useReducer in combination with useContext.
```

# Learn More

You can learn more in the Create React App documentation.

To learn React, check out the <a href="https://reactjs.org/docs/getting-started.html">React documentation</a>, <a href="https://reactjs.org/docs/hooks-intro.html">React Hooks</a>.
