import { Component, type ReactNode } from 'react';
import './App.css';
import Home from './pages/Home';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Home />
      </>
    );
  }
}

export default App;
