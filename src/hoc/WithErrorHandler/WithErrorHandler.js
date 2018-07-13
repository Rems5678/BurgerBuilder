import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null,
		}
	
	//when we know that we want to mount a component, but we're not sure if it will be mounted we invoke an interceptor.  This interceptor changes the state error property so that a Modal will appear.
	
		componentWillMount () {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			})
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		}
	//ensures that we clean up the interceptors when we're not using the component.  When the component unmounts it ejects the interceptor.
	componentWillUnmount() {

		axios.interceptors.request.eject(this.reqInterceptor)
		axios.interceptors.response.eject(this.resInterceptor)
}
		
	errorConfirmedHandler = () => {
		this.setState({error:null})
	}
	
		render() {
		return (
			<Aux>
				<Modal
					show = {this.state.error}
					modalClosed = {this.errorConfirmedHandler}>
					{this.state.error ? this.state.error.message : null}
				</Modal>
				<WrappedComponent {...this.props}></WrappedComponent>
			</Aux>
		)
		}


		
	}
}

export default WithErrorHandler;