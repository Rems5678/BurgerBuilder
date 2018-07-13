import React, {Component} from 'react';
import {connect } from 'react-redux';
import axios from '../../axiosOrders';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

	componentDidMount() {
		this.props.onFetchOrders(this.props.token, this.props.userId);
	}
	render () {
		
		let orders = <Spinner></Spinner>;
		if (!this.props.loaading) {
			orders = (this.props.orders.map(val => (
					<Order
						key = {val.id}
						ingredients = {val.ingredients}
						price = {+val.price}></Order>
				)));
		}
		
		return (
			<div>
				{orders}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));