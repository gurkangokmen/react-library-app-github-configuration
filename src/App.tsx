import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/components/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/components/Carousel';
import { Heros } from './layouts/HomePage/components/Heros';
import { LibraryServices } from './layouts/HomePage/components/LibraryServices';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';
import { MessagesPage } from './layouts/MessagesPage/MessagesPage';
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage';
import { PaymentPage } from './layouts/PaymentPage/PaymentPage';


const oktaAuth = new OktaAuth(oktaConfig);

//
// JSX expressions must have one parent element.
// so, we use div
//

/** 

Video 101 React Router - Installation:

localhost:3000/
localhost:3000/search
(Technically - Two routes are rendering at once)

↳ we do slash search of root, we get the home page and the search books page.
we do slash search, we are getting this home page 
because Slash is the very first thing that's called.
So in the React router, Dom, it's saying, Hey, Slash search is also a slash, so let's render the
home page and then let's also render the search after.
So in this case, we are in essence, rendering two routes.

SOLUTION: switch case
*/

/**

      <Switch>

        <Route path='/'>
          <HomePage />
        </Route>

        <Route path='/search'>
          <SearchBooksPage />
        </Route>

      </Switch>

we did here was now a switch case only allows us to render one route.
So what we're saying is this slash search, when this is added to the end of our URL, it's still grabbing
this slash as the very first thing we want to render.
So interesting enough, when we do slash search, it's grabbing this slash and it's overriding it every
single time.
What we can do here is add exact.

SOLUTION: exact keyword
*/

export const App = () => {

  const customAuthHandler = () => {
    history.push('/login');
  }

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/search'>
              <SearchBooksPage />
            </Route>

            <Route path='/reviewlist/:bookId'>
              <ReviewListPage />
            </Route>

            <Route path='/checkout/:bookId'>
              <BookCheckoutPage />
            </Route>

            <Route path='/login' render={
              () => <LoginWidget config={oktaConfig} />
            }
            />

            <Route path='/login/callback' component={LoginCallback} />

            <SecureRoute path='/shelf'> <ShelfPage/> </SecureRoute>

            <SecureRoute path='/messages'> <MessagesPage/> </SecureRoute>

            <SecureRoute path='/admin'> <ManageLibraryPage/> </SecureRoute>

            <SecureRoute path='/fees'> <PaymentPage/> </SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>

  );
}

