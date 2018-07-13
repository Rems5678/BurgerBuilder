import React from 'react';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import classes from './Sidedrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const Sidedrawer = (props) => {
	let attachedClasses = [classes.Sidedrawer, classes.Close]
	if (props.open) {
		attachedClasses = [classes.Sidedrawer, classes.Open]
	}
	return (
		<Aux >
			<Backdrop show = {props.open} clicked = {props.show}></Backdrop>
			<div className = {attachedClasses.join(' ')} onClick = {props.show}>
				<div className = {classes.Logo}>
					<Logo></Logo>
				</div>

				<nav>
					<Navigationitems isAuthenticated = {props.isAuth}></Navigationitems>
				</nav>
			</div>
		</Aux>
	);
}

export default Sidedrawer;