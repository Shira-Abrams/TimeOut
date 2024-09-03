import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import Footer from './stories/footer/FooterComponent';
import { store } from './redux/store.jsx';
import Layout from './router/layout.jsx';
import Settings from './components/settings/Settings.jsx';

import './App.scss';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<h1>home</h1>} />
              <Route path="home" element={<h1>home</h1>} />
              <Route path="profiles" element={<h1>ProfileList</h1>} />
              <Route path="reports" element={<h1>reports</h1>} />
              <Route path="statistics" element={<h1>statistics</h1>} />
              <Route path="settings" element={<Settings/>} />
              <Route path="*" element={<h1>home</h1>} />
            </Route>
          </Routes>
          <Footer />
        </HashRouter>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;