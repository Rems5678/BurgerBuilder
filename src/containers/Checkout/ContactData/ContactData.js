import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
	
	state = {
		orderForm: {
			name: {
				elementtype: 'input',
				elementconfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementtype: 'input',
				elementconfig: {
					type: 'text',
					placeholder: 'Street Address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementtype: 'input',
				elementconfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 10
				},
				valid: false,
				touched: false
			},
			country: {
				elementtype: 'input',
				elementconfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementtype: 'input',
				elementconfig: {
					type: 'email',
					placeholder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementtype: 'select',
				elementconfig: {
					options: [
						{
							value: 'fastest',
							displayValue: 'Fastest'
								},
						{
							value: 'cheapest',
							displayValue: 'Cheapest'
								},
							]
				},
				validation: {
					required: true},
				valid: true,
				value: 'fastest'
			},
		},
		formIsValid: false
	}
	
	orderHandler = (event) => {
		//for a production ready app make sure to calculate the price on the server so the user can't manipulate the price beforehand.
		event.preventDefault();
		const formData ={};
		for (let elIdent in this.state.orderForm) {
			formData[elIdent] = this.state.orderForm[elIdent].value
		}
		
	this.setState({
		loading: true
	})
	const order = {
		ingredients: this.props.ings,
		price: this.props.price,
		orderData: formData,
		userId: this.props.userId
		}
	this.props.onOrderBurger(order, this.props.token);
}



	inputChangedHandler = (event, inputIdentifier) => {
		//by only setting a mutable object {...this.state.orderForm} we are not deeply cloning the object, i.e., nested objects are not deeply cloned.

		const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
			value: event.target.value, 
			valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
			touched: true});
		const updatedOrderForm = updateObject(this.state.orderForm, {[inputIdentifier]: updatedFormElement});
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
			
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}
	
	render () {
		
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (<div className = {classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				<form onSubmit = {this.orderHandler}>
					{formElementsArray.map((value) =>
					(<Input
						key = {value.id}
						elementtype = {value.config.elementtype}
						elementconfig = {value.config.elementconfig}
						value = {value.config.value}
						changed = {(event) => this.inputChangedHandler(event, value.id)}
						invalid = {!value.config.valid}
						shouldValidate = {value.config.validation}
						touched = {value.config.touched}></Input>)
					)}
					<Button btnType = "Success" clicked = {this.orderHandler} disabled = {!this.state.formIsValid}>ORDER</Button>
				</form>
			</div>);
		if (this.props.loading) {
			form = <Spinner></Spinner>
		}
		return (
			form
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burger.ingredients,
		price: state.burger.totalPrice,
		loading: state.orders.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));