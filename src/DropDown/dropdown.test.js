import DropDown from './DropDown';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders Dropdown component', () => {
it('renders as expected', () => {
    const wrapper = shallow(
        <DropDown 
            id="fromCurrency"
            rates={{ "GBP": "2650", "USD": "1200", "EUR": "8500" }}
            currency={"HUF"}
            onChange={() => {}}
        />
    );
    expect(wrapper).toMatchSnapshot();
});
});