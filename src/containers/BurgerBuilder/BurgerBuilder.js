import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BuildControls/OrderSummary/OrderSummary'
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
	state = {
		purchaseable: false,
		purchasing: false,
	}

componentDidMount () {
this.props.onInitIngredients()

}



updatePurchaseState(ingredients) {
	const sum = Object.keys(ingredients).map((val) => {
		return ingredients[val]
	}).reduce((sum, el) => {
		return sum + el;
	}, 0)
	return sum > 0
}


purchaseHandler = () => {
	if (this.props.isAuthenticated){
		this.setState({purchasing: true})
	}
	else {
		this.props.onSetRedirectPath('/checkout');
		this.props.history.push('/auth')
	}
}
purchaseCancelHandler = () => {
	this.setState({purchasing: false})
}
purchaseContinueHandler = () => {
	this.props.onInitPurchase();
	this.props.history.push('/checkout');
	
}
		render() {
			const disabledInfo = {
				...this.props.ings
			};
			for (let key in disabledInfo) {
				disabledInfo[key] = disabledInfo[key] <= 0
			}
			let orderSummary = null
			
			let burger = this.props.err ? <p>Ingredients can't be loaded.</p> : <Spinner></Spinner>
			if (this.props.ings !== null) {
				orderSummary = <OrderSummary
						ingredients = {this.props.ings}
						cancel = {this.purchaseCancelHandler}
						continue = {this.purchaseContinueHandler}
						total = {this.props.price}></OrderSummary>
				burger = (
				<Aux>
					<Burger ingredients = {this.props.ings}></Burger>
					<BuildControls
						isAuth = {this.props.isAuthenticated}					
						more = {this.props.onIngredientAdded}
						less = {this.props.onIngredientRemoved}
						disabled = {disabledInfo}
						price = {this.props.price}
						purchaseable = {this.updatePurchaseState(this.props.ings)}
						ordered = {this.purchaseHandler}
						></BuildControls>
				</Aux>)
			}

		return (
			<Aux>
				{burger}
				<Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
					{orderSummary}
					
				</Modal>
			</Aux>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burger.ingredients,
		price: state.burger.totalPrice,
		err: state.burger.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));