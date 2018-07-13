import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Navigationitems from '../Navigationitems/Navigationitems'
import Menu from '../Menu/Menu';

const Toolbar = (props) => (
	<header className = {classes.Toolbar}>
		<Menu open = {props.open} clicked = {props.show}></Menu>
		<div className = {classes.Logo}>
			<Logo></Logo>
		</div>
		
		<nav className = {classes.DesktopOnly}>
			<Navigationitems isAuthenticated = {props.isAuth}></Navigationitems>
		</nav>
	</header>
)
export default Toolbar;