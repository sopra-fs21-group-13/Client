import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
//import Login from "../../login/Login";
import LearnPage from "../../learnPage/LearnPage";
import DashBoard from "../../dashBoard/DashBoard";
import Profile from "../../profile/Profile";
import PublicProfile from "../../profile/PublicProfile";
import MainPage from "../../mainPage/MainPage";
import EditCreateSet from "../../editCreateSet/EditCreateSet";
import AboutUs from "../../AboutUs/AboutUs.js";

import SearchSets from "../../search/searchSets/SearchSets";
import SearchUsers from "../../search/searchUsers/SearchUsers";
import SearchAll from "../../search/SearchAll";

import Help from "../../help/help.js"
import Contact from "../../contact/contact.js"
import SetOverview from "../../setOverview/SetOverview";
import Game from "../../game/Game";
import GameNew from "../../game/GameNew";
import Results from "../../game/results.js";
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
                path="/results/:id"
                render={() => (
                  <Results />
                )}
            />

            <Route
                path="/game/:id"
                render={() => (
                  <GameNew />
                )}
            />   


            {/* <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            /> */}
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
              path="/searchSets"
              exact
              render={() => (
                  <SearchSets />
              )}
            />

            <Route
              path="/searchUsers"
              exact
              render={() => (
                  <SearchUsers />
              )}
            />
            <Route
              path="/searchAll"
              exact
              render={() => (
                  <SearchAll />
              )}
            />

            <Route path="/" exact render={() => <Redirect to={"/dashboard"} />} />

            <Route
              path="/help"
              exact
              render={() => (
                  <Help />
              )}
            />

            <Route
              path="/contact"
              exact
              render={() => (
                  <Contact />
              )}
            />

            <Route
              path="/overview"
              exact
              render={() => (
                  <SetOverview />                
              )}
            />


            <Route path="/" exact render={() => <Redirect to={"/main"} />} />

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
