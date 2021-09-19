import "./balance.css";
import React from 'react';

function Balance(props) {
    return (
        <div className="balance-component" id={props.id}>
            <div className="balance">
            {"Balance: " + (props.currencyAccounts[props.currency] ? parseFloat(props.currencyAccounts[props.currency]).toFixed(2) : 0)}
            </div>
        </div>
    )
}

export default Balance;