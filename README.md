# FLASHY - Client Side



## Introduction: the project’s aim
Flashy is an application with which students (and other users) can create digital fashcard stacks.
Besides the ordinary capabilities of physical fashcards, the ability to share the created stacks with other users, promoting the learning experience using social interaction and creating a good working environment.

A game component is also introduced, such that multiple users can participate competing against each other; seeing who can solve the stacks the fastest. We want to include a feature which captures the user's advancement towards manifesting their knowledge such as a reward system or experience/level type of thing. 

## Technologies used (short)
- React class/ hook

- google material design
   npm install @material-ui/core
   npm install @material-ui/icons
   
- Google login API
- npm install @formspree/react


## High-level components
After you add sets from public set search page or created new sets by yourself, you can learn from the set(Learn button) or play game(Play button) with another user on the sets you have in the dashboard.

### dashboard Component
(link to the dashboard.js file)
- Own Sets: Sets created by yourself, by clicking set box with '+'
- Foreign Sets: Public sets you added to your dashboard, created by other users
- Want to find new flashcards to join?: Directing you to search sets&users page so that you can add new sets to your dashboard

### Learnpage Component
(link to the learnpage.js file)
You can learn cards by flipping the cards to see the questions and answers, combining with the functions:
- learning only from starred cards
- shuffle
- flip the card
- starring all

### Game Component
(link to the game.js file)
- after invitating 


## Launch & Deployment: Write down the steps a new developer joining your team would
have to take to get started with your application.
- What commands are required to build and
run your project locally? 
- How can they run the tests? 
- Do you have external dependencies or a database that needs to be running?
- How can they do releases?

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

#### `npm install`

This has to be done before starting the application for the first time (only once).

#### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Open from specific browser: BROWSER=firefox npm run dev

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

#### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations: In your client repository, briefly describe and illustrate the main user flow(s)
of your interface. How does it work (without going into too much detail)? Feel free to
include a few screenshots of your application.

## Roadmap: The top 2-3 features that new developers who want to contribute to your project
- Gaming with more that 1 person can be good to be implemented later

## Authors and acknowledgment
Kiram Ben Aleya 
Silvan Caduff 
Seonbin Kim
Remus Nichiteanu 
Nazim Bayram 

## License: Say how your project is licensed 
(see License guide3)


Read and go through those Tutorials, It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) Let's you access the state of the router and perform navigation from inside your components.
