import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import {Route,Switch,withRouter} from 'react-router-dom'

import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as action from './store/actions/index'

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

const asyncOrder = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})

class App extends Component {

componentDidMount(){
  this.props.onTryAutoSiunUp();
}


  render() {

  let routes =(
    <Switch>
      <Route path="/Auth" component={asyncAuth}/> 
      <Route path="/" component={BurgerBuilder}/>
    </Switch>
  );

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/Orders" component={asyncOrder}/>
        <Route path="/Checkout" component={asyncCheckout}/>
        <Route path="/Auth" component={asyncAuth}/> 
        <Route path="/logout" component={Logout}/>
        <Route path="/" component={BurgerBuilder}/>
      </Switch>    
    )
  }


    return (
      <div>
        <Layout>
          {routes}   
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSiunUp : ()=>dispatch(action.authCheckState())
  };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
