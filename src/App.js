import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store'
import SearchInput from './Components/HomePage/SearchInput';
import './App.css';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header" />
          <SearchInput />
        </div>
      </Provider>
    );
  }
}

export default App;
