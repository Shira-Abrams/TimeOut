import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import { SnackbarProvider } from 'notistack';
import './App.scss';
function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} />
        <Footer />
      </SnackbarProvider>
    </Provider>
  );
}
export default App;