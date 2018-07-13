import React from 'react';
import classes from './Input.css'
const Input = (props) => {
	
	let inputElement = null;
	const inputClasses = [classes.InputElement];
	
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}
	switch (props.elementtype) {
			case('input'):
			inputElement = <input
			 className = {inputClasses.join(' ')} 
			 {...props.elementconfig} 
			 value = {props.value}
			 onChange = {props.changed}></input>;
			break;
			case('textarea'):
			inputElement = <textarea
			 className = {inputClasses.join(' ')} 
			 {...props.elementconfig}
			  value = {props.value}
			  onChange= {props.changed}></textarea>;
			break;
			
			case('select'):
			inputElement = (<select
			 className = {inputClasses.join(' ')}
						value = {props.value}
						onChange= {props.changed}>
							{props.elementconfig.options.map((val) =>(
						<option key = {val.value} value = {val.value}>
								{val.displayValue}
						</option>
					))}
			  </select>
			);
			break;
		default: 
			inputElement = <input
			 className = {inputClasses.join(' ')} 
			 {...props.elementconfig} 
			 value = {props.value}
			 ></input>;
			break;
	}
	
	return (
	<div className = {classes.Input}>
		<label className = {classes.Label}>{props.label}</label>
	{inputElement}
	</div>
)};

export default Input;