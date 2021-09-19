import NumberInput from './NumberInput';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow,mount,render } from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Renders NumberInput component', () => {
it('renders as expected', () => {    
    const onChange = jest.fn();
    const wrapper = shallow(
        <NumberInput 
            id="to"
            value=""
            onChange={() => {onChange()}}
        />
    );

    expect(wrapper).toMatchSnapshot();
});
});
