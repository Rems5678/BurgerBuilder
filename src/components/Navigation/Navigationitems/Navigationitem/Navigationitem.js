import React from 'react';
import classes from './Navigationitem.css';
import {NavLink} from 'react-router-dom';
const Navigationitem = (props) => (
	<li className = {classes.Navigationitem}>
		<NavLink 
			activeClassName={classes.active}
			exact
			to = {props.link}
			>{props.children}</NavLink>
	</li>
)

export default Navigationitem;