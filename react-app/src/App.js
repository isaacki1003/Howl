import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateBusiness from './components/business/CreateBusiness';
import Landing from './components/landing/Landing';
import EditBusiness from './components/business/EditBusiness';
import SingleBusiness from './components/business/SingleBusiness';
import FindBusinessToReview from './components/reviews/FindBusinessToReview';
import CreateReview from './components/reviews/CreateReview';
import Header from './components/Header';
import BlackHeader from './components/BlackHeader';
import EditReview from './components/reviews/EditReview';
import PageNotFound from './components/PageNotFound';
// import ComingSoon from './components/ComingSoon';
import SearchResults from './components/search/SearchResults';
import ScrollToTop from './components/ScrollToTop';
import { initGA, logPageView } from './analytics';

const TRACKING_ID = "G-0DHWH5RWQX";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    initGA(TRACKING_ID);
    logPageView();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path="/search">
					<BlackHeader />
					<SearchResults />
				</Route>
        <ProtectedRoute path='/writeareview' exact={true}>
          <FindBusinessToReview />
          {/* <ComingSoon /> */}
        </ProtectedRoute>
        <ProtectedRoute path="/create-business" exact={true}>
					<CreateBusiness />
				</ProtectedRoute>
        <ProtectedRoute path="/business/:businessId/create-review" exact={true}>
					<CreateReview />
				</ProtectedRoute>
        <ProtectedRoute path="/business/:businessId/edit" exact={true}>
          <EditBusiness />
        </ProtectedRoute>
        <Route exact path="/business/:businessId">
          <BlackHeader />
					<SingleBusiness />
				</Route>
        <ProtectedRoute path='/business/:businessId/reviews/:reviewId/edit' exact={true}>
          <EditReview />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true}>
          <Header />
          <Landing />
        </Route>
        <Route path='/'>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
