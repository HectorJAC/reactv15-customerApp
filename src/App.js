import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CustomerContainer from './containers/CustomerContainer';
import CustomersContainer from './containers/CustomersContainer';
import HomeContainer from './containers/HomeContainer';
import NewCustomerContainer from './containers/NewCustomerContainer';

class App extends Component {

  renderHome = () => <h1> Home </h1>;

  renderCustomerContainer = () => <h1> Customer Container </h1>;

  renderCutomerListContainer = () => <h1> Customer List Container </h1>;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeContainer}/>
          <Route exact path="/customers" component={CustomersContainer}/>
          <Switch>
            <Route path="/customers/new" component={NewCustomerContainer}/>
            <Route 
              path="/customers/:dni" 
              render={props => <CustomerContainer dni={props.match.params.dni} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
