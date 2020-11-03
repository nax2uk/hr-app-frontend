import React from 'react';
import Enzyme, { mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '../components/App';
import Login from '../components/Login';
import Home from '../components/Home';
// import { users } from '../data.json';

Enzyme.configure({ adapter: new Adapter() });

describe('Logging in', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = Enzyme.mount(<App />)
    });
    
    it('user sees a welcome message on the Home Page after logging in', () => {
        wrapper.find('input[name="username"]').simulate('change', {
			target: {
				name: 'username',
				value: 'jfawl',
			},
        });
        wrapper.find('input[name="password"]').simulate('change', {
			target: {
				name: 'password',
				value: '1234',
			},
        });
        wrapper.find('form').simulate('submit', { 
			preventDefault: jest.fn()
        });
        const welcomeMessage = <h1 className='userInfo__headerText'>Welcome Joanna!</h1>
        expect(wrapper.contains(welcomeMessage)).toEqual(true);
    }); 
});