import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
	return import('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() => {
	return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() => {
	return import('./containers/Auth/Auth');
})

class App extends Component {

	componentDidMount() {
		this.props.onTryAutoSignup()
	}
	
  render() {
		let routes = (
			<div>
				<Route path = '/' exact component = {BurgerBuilder}></Route>
				<Route path = '/auth' exact component = {asyncAuth}></Route>
				<Redirect to = '/'></Redirect>
			</div>
		);
		
		if (this.props.isAuthenticated) {
			routes = (
				<div>
					<Route path = '/' exact component = {BurgerBuilder}></Route>
					<Route path = '/auth' exact component = {asyncAuth}></Route>
					<Route path = '/logout' exact component = {Logout}></Route>
					<Route path = '/checkout' component = {asyncCheckout}></Route>
					<Route path = '/orders' exact component = {asyncOrders}></Route>
					<Redirect to = '/'></Redirect>
				</div>

			)
		}
		
    return (
				<BrowserRouter>
					<Layout>
						{routes}
					</Layout>
				</BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
