import { Component, type ReactNode } from 'react';
import './App.css';
import Home from './pages/Home';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    );
  }
}

export default App;
