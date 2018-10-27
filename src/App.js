import React, { Component } from 'react';

import web3 from 'web3'
import { Route, Link, HashRouter } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import MenuAppBar from './components/menu-app-bar'
import Inventory from './components/inventory'
import SalesReport from './components/sales-report'
import Add from './components/add'
import ROUTE from './constants/route'

class App extends Component {

  componentWillMount() {
    console.log(web3);
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
            <MenuAppBar/>
            <Switch>
              <Route exact path={ROUTE.PATH.INVENTORY} component={Inventory}/>
              <Route exact path={ROUTE.PATH.SALES_REPORT} component={SalesReport} />
              <Route exact path={ROUTE.PATH.ADD} component={Add} />
              <Route exact path={ROUTE.PATH.EDIT} component={Add} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
