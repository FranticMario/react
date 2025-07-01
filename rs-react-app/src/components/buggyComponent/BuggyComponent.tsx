import { Component } from 'react';

class BuggyComponent extends Component {
  render() {
    throw new Error('Ошибка в render');
    return <div>Этот код не выполнится</div>;
  }
}

export default BuggyComponent;
