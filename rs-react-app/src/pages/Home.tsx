import { Component } from 'react';
import Header from '../components/header/Header';
import CardList from '../components/cardList/CardList';

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <CardList />
      </>
    );
  }
}

export default Home;
