/**
 *
 * Description. Main Route File
 *
 * @link   URL
 * @file   Whenever user hits any url into browser then this functions gets called
           It will redirected to appropriate page as per the URL info. If no match
           found in any Route then it opens 404 page
 * @since  1.0.0
 */
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const Loading = () => <div>Loading...</div>;
const Clients = lazy(() => import("../components/Client/index.jsx"));

const RouterExport = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <Route exact path="/" component={Clients} />
        <Route exact path="/create" component={Clients} />
        <Route exact path="/edit/:id" component={Clients} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  </Suspense>
);

export default RouterExport;
