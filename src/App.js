import React, { Component } from 'react';

import { Route, Link, HashRouter } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import MenuAppBar from './components/menu-app-bar'
import Inventory from './components/inventory'
import SalesReport from './components/sales-report'
import Add from './components/add'
import Payment from './components/payment'

import ROUTE from './constants/route'

const styles = {
  backgroundColor: 'cornflowerblue'
}

class App extends Component {
  render() {
    return (
      <div className="App" style={styles}>
        <HashRouter basename={process.env.PUBLIC_URL} id={110}>
          <div id={"a"}>
            <MenuAppBar id={98}/>
            <Switch id={109}>
              <Route exact path={ROUTE.PATH.INVENTORY} component={Inventory} id={105}/>
              <Route exact path={ROUTE.PATH.SALES_REPORT} component={SalesReport} id={106}/>
              <Route exact path={ROUTE.PATH.ADD} component={Add} id={107}/>
              <Route exact path={ROUTE.PATH.EDIT} component={Add} id={121}/>
              <Route path="/payment/:address/:amount/" component={Payment} id={108}/>
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App
