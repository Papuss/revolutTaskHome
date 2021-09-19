import "./numberInput.css";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import React from 'react';

function NumberInput(props) {
    return (
        <div className="number-component" id={props.id}>
            <div className="number-input">
                <MaskedInput
                    mask={createNumberMask({
                        prefix: "",
                        allowDecimal: true,
                        allowNegative: false,
                        thousandsSeparatorSymbol: "",
                        decimalSymbol: "."
                    })}
                    value={props.value}
                    onChange={event => {
                        props.onChange(event.target.value);
                    }}
                    type="text"
                    className="input"
                    placeholder="0.00"
                />

            </div>
        </div>
    )
}

export default NumberInput;