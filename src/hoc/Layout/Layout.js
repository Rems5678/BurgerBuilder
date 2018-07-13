import React, {Component} from 'react';
import {connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	
	sideDrawerCloseHandler = () => {
		this.setState({showSideDrawer: false})		
	}
	sideDrawerToggleHandler = () => {
		this.setState((prevState) =>  {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
	render () {
		return (
	<Aux>
		<Toolbar
			isAuth = {this.props.isAuthenticated}
			show = {this.sideDrawerToggleHandler}></Toolbar>
		<Sidedrawer
			isAuth = {this.props.isAuthenticated}
			open ={this.state.showSideDrawer}
			show = {this.sideDrawerCloseHandler}></Sidedrawer>
		<main className = {classes.Content}>
			{this.props.children}
		</main>
	</Aux>
		)
	}
}  

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default withRouter(connect(mapStateToProps)(Layout));