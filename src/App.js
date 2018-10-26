import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import web3 from 'web3'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import MenuAppBar from './components/menu-app-bar'
import Inventory from './components/inventory'
import SalesReport from './components/sales-report'
import Add from './components/add'

class App extends Component {

  componentWillMount() {
    console.log(web3);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <MenuAppBar/>
            {/* <Route exact path="/" component={Inventory} /> */}
            {/* <Route exact path="/sales-report" component={SalesReport} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/edit" component={Add} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
