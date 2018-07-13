import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../UI/Button/Button';

const OrderSummary= (props) => {

	const ingredientSummary = Object.keys(props.ingredients).map((val) => {
		return <li key = {val + props.ingredients[val]}>
				<span
					style = {{textTransform: 'capitalize'}}>{val}:</span> {props.ingredients[val]}
					</li>
	})

	return (	
	<Aux>
		<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: ${props.total}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType = 'Danger' clicked = {props.cancel}>CANCEL</Button>
			<Button btnType = 'Success' clicked = {props.continue}>CONTINUE</Button>
	</Aux>)

}
	


export default OrderSummary;