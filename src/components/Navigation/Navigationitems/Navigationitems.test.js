import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import Navigationitem from './Navigationitem/Navigationitem';

configure({adapter: new Adapter()});

describe('<NavigationItems/>', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<NavigationItems></NavigationItems>);
	})
	
	it('should render two NavigationItem elements if not authenticated', () => {
		expect(wrapper.find(Navigationitem)).toHaveLength(2);
	});
	
	it('should render three NavigationItem elements if authenticated', () => {
		// wrapper = shallow(<NavigationItems></NavigationItems>);
		wrapper.setProps({isAuthenticated: true})
		expect(wrapper.find(Navigationitem)).toHaveLength(3);
	});
	
		
	it('should contain the NavigationItem element "logout" if authenticated', () => {
		wrapper.setProps({isAuthenticated : true})
		expect(wrapper.contains(<Navigationitem link = '/logout'>Logout</Navigationitem>)).toEqual(true);
	});
});