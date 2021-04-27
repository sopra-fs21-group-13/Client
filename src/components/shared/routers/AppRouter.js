import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import LearnPage from "../../learnPage/LearnPage";
import DashBoard from "../../dashBoard/DashBoard";
import Profile from "../../profile/Profile";
import PublicProfile from "../../profile/PublicProfile";
import MainPage from "../../mainPage/MainPage";
import EditCreateSet from "../../editCreateSet/EditCreateSet";
import AboutUs from "../../AboutUs/AboutUs.js"
import Search from "../../search/Search";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
                path="/learnPage"
                render={() => (
                  <LearnPage />
                )}
            />

            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
              path="/dashboard"
              exact
              render={() => (
                  <DashBoard />                
              )}
            />
            <Route
              path="/profile"
              exact
              render={() => (
                  <Profile />                
              )}
            />

            <Route
              path="/publicProfile"
              exact
              render={() => (
                  <PublicProfile />                
              )}
            />
            <Route
              path="/main"
              exact
              render={() => (
                  <MainPage />                
              )}
            />
            <Route
              path="/edit"
              exact
              render={() => (
                  <EditCreateSet />                
              )}
            />

            <Route
              path="/about"
              exact
              render={() => (
                  <AboutUs />
              )}
            />

            <Route
              path="/search"
              exact
              render={() => (
                  <Search />
              )}
            />

            <Route path="/" exact render={() => <Redirect to={"/dashboard"} />} />

          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
