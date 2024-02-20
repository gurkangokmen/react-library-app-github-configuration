import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App'; // App component has no default export so we use brackets ====> {}
import { BrowserRouter } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OPLJuGnBx5OQVIad6k4862eRT0ydPnJ7yy1XsPuCrIZ3tIe92RuZlsykXIrd0vm57wZyGArSsS0tnokYtrjQ7HW00hNVTyL3Q');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  /** 
  Browser router is really the global element of React router DOM saying we can now use routes
  inside the component app in our component app is going to be kind of the main source of truth for our
  entire application when using routes.
  */ 
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>
);


