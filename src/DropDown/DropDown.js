import "./dropDown.css";
import {Select} from "antd";
import React from 'react';

const { Option } = Select;

function renderCurrencies (props) {
    return (
        props.rates &&
        Object.keys(props.rates).map((currency, index) => (
            <Option value={currency} key={index}>{currency}</Option>
        ))
    );
}

function DropDown (props) {
    return (
        <div className="dropdown-component" id={props.id}>
        <div className="options">
            <Select defaultValue={props.currency} style={{ width: 120 }}
            onChange={newCurr => {
                props.onChange(newCurr);                                      
            }}>
                {renderCurrencies(props)}
            </Select>
        </div>
    </div>
    )
}

export default DropDown;