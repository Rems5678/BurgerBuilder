import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {


	
checkoutCancelledHandler = () => {
	this.props.history.goBack();
}

checkoutContinuedHandler = () => {
	this.props.history.replace('/checkout/contact-data');
}
	render() {

		let summary = <Redirect to = '/'></Redirect>
					if (this.props.ings) {
						const purchasedRedirect = this.props.purchased ? <Redirect to = '/'></Redirect> : null;
					summary =
						<div>
						{purchasedRedirect}
							<CheckoutSummary
							ingredients = {this.props.ings}
							onCheckoutCancelled = {this.checkoutCancelledHandler}
							onCheckoutContinued = {this.checkoutContinuedHandler}></CheckoutSummary>
							<Route path = {this.props.match.path + '/contact-data'} component = {ContactData} ></Route>
						</div>
					}
		return summary	
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.burger.ingredients,
		purchased: state.orders.purchased
	}
}

export default connect(mapStateToProps)(Checkout);