import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{label: 'Lettuce', type: 'salad'},
	{label: 'Bacon', type: 'bacon'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Meat', type: 'meat'}
];
const BuildControls = (props) => (
	
	<div className = {classes.BuildControls}>
		<p>Current Price: $<strong>{props.price.toFixed(2)}</strong></p>
		{controls.map((val) => {
			return <BuildControl
							 key = {val.label}
							 label = {val.label}
							 added = {() => props.more(val.type)}
							 removed = {() => props.less(val.type)}
							 disabled = {props.disabled[val.type]}></BuildControl>
				
		})}
		<button
			className = {classes.OrderButton}
			disabled = {!props.purchaseable}
			onClick = {props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
	</div>
)

export default BuildControls;