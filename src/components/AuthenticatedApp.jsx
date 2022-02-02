import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from 'pages/home/Home.jsx';
import AddConference from 'pages/conference/conferenceAdd/AddConference';
import ConferenceList from 'pages/conference/conferenceList/ConferencesList';
import Conference from 'pages/conference/coference/Conference';
import Profile from 'pages/profile/Profile';
import NotFound from 'pages/notFound/NotFound';
import Faq from 'pages/faq/Faq.jsx';

const AuthenticatedApp = () => {
  return (
    <Switch>
      <Route path="/Faq">
        <Faq />
      </Route>
      <Route path="/add-conference">
        <AddConference />
      </Route>
      <Route path="/conferences">
        <ConferenceList />
      </Route>
      <Route exact path="/conference/:id" render={(props) => <Conference {...props} />} />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default AuthenticatedApp;
