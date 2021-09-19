import Balance from './Balance';
import enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

enzyme.configure({ adapter: new Adapter() });

describe('Renders Balance component', () => {
it('should renders correctly', () => {
    const wrapper = shallow(
        <Balance 
            id="balance"
            currencyAccounts={{ "GBP": "2650", "USD": "1200", "EUR": "8500" }}
            currency={"HUF"}
        />
    );
    expect(wrapper).toMatchSnapshot();
});
});
