export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	}
}

	export const checkValidity = (value, rules) => {
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