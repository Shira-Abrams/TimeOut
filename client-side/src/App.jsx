import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import Footer from './stories/footer/FooterComponent';
import { router } from './router/router.jsx';
import { store } from './redux/store.jsx';
import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const response = event.data;
      console.log(`Received from server: ${response}`);
      setMessages((prevMessages) => [...prevMessages, response]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);



  return (
    <div className="App">
    <RouterProvider router={router} />
    <Provider store={store}>
      <Footer />
      </Provider>
    </div>
  );
}

export default App;




