import React, { Component } from "react";
import Header from "./components/header/header.js";
import AppRouter from "./components/shared/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <AppRouter />
        
      </div>
    );
  }
}

export default App;
