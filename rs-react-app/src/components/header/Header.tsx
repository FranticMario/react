import { Component, type ReactNode } from 'react';

class Header extends Component {
  render(): ReactNode {
    return (
      <form>
        <input type="text" />
        <button>Search</button>
      </form>
    );
  }
}

export default Header;
