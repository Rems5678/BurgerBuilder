import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementtype: 'input',
				elementconfig: {
					type: 'email',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},

				valid: false,
				touched: false,
			},
			password: {
				elementtype: 'input',
				elementconfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			},
		},
		isSignup: true
		}
		
		componentDidMount() {
			if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
				this.props.onSetAuthRedirectPath();
			}
		}

		checkValidity(value, rules) {
		let isValid = false;
		
		if (rules.required) {
			isValid = value.trim() !== '' ;	
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}
		return isValid;
	}
submitHandler = event => {
	event.preventDefault();
	this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
}

switchAuthModeHandler = () => {
this.setState(prevState => {
	return {
		isSignup: !prevState.isSignup
	}
})	
}
inputChangedHandler = (event, controlName) => {

	const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
			touched: true
		})
	})
	this.setState({
		controls: updatedControls
	})
}
	render () {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			})
		}
		
		let form = formElementsArray.map(value => (
			<Input
				key = {value.id}
				elementtype = {value.config.elementtype}
				elementconfig = {value.config.elementconfig}
				value = {value.config.value}
				changed = {(event) => this.inputChangedHandler(event, value.id)}
				invalid = {!value.config.valid}
				shouldValidate = {value.config.validation}
				touched = {value.config.touched}
			></Input>
			
		));
		
		if (this.props.loading) {
			form = <Spinner></Spinner>
		}
		
		let errorMessage = null;
		
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			)
		}
		
		let authRedirect = null;
		if (this.props.isAuthenticated) {
				authRedirect = <Redirect to = {this.props.authRedirectPath}></Redirect>
		}
		
		return (
			<div className = {classes.Auth}>
			{authRedirect}
			{this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
			{errorMessage}
				<form onSubmit = {this.submitHandler}>
				{form}
					<Button btnType = 'Success'>SUBMIT</Button>
				</form>
				<Button btnType = 'Danger' clicked = {this.switchAuthModeHandler}> SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		buildingBurger: state.burger.building,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath('/'))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);