import './App.css';
import React, { Component } from 'react';
import DropDown from './DropDown/DropDown';
import NumberInput from "./NumberInput/NumberInput";
import axios from "axios";
import Balance from './Balance/Balance';
import _ from "lodash";
import { Button } from 'antd';

class App extends Component {
    constructor() {
        super();

        this.state = {
            fromCurrency: "EUR",
            toCurrency: "GBP",
            fromValue: "",
            toValue: "",
            currencyAccounts: { "GBP": "2650", "USD": "1200", "EUR": "8500" },
            transactionFlowIsSell: true
        }
    }

    getExchangeRate = () => {
        if(!this.state.fromCurrency) {
            return;
        }
        var latestRequest = {
            method: "get",
            url: 'https://api.exchangerate.host/latest?base=' + this.state.fromCurrency
        };

        axios(latestRequest)
            .then(request => {
                if (request.status === 200 && request.data) {
                    this.setState({
                        latestRates: request.data
                    })
                }                
            })
            .catch(function (error) {
                console.log("There was an error \n", error);
                return false;
            });           
    };

    componentDidMount(){
        this.getExchangeRate();
        window.setInterval(this.getExchangeRate, 10000); 
    }

    updateToValue = () => {
        this.setState({
            toValue: this.state.fromValue ? parseFloat(parseFloat(this.state.fromValue) * parseFloat(this.state.latestRates.rates[this.state.toCurrency])).toFixed(2) : 0
        })
    };

    updateFromValue = () => {
        this.setState({
            fromValue: this.state.toValue ? parseFloat(parseFloat(this.state.toValue) / parseFloat(this.state.latestRates.rates[this.state.toCurrency])).toFixed(2) : 0
        })
    };

    exchangeCurrencies = sell => {
        let currAccounts = _.cloneDeep(this.state.currencyAccounts);
        let fromCurrencyAccountValue = parseFloat(this.state.currencyAccounts[this.state.fromCurrency]).toFixed(2);
        let toCurrencyAccountValue = parseFloat(this.state.currencyAccounts[this.state.toCurrency]).toFixed(2);
        let fromValue = parseFloat(this.state.fromValue);
        let toValue = parseFloat(this.state.toValue);
        let fromAccountValue = isNaN(parseFloat(currAccounts[this.state.fromCurrency])) ? 0 : parseFloat(currAccounts[this.state.fromCurrency]);
        let toAccountValue = isNaN(parseFloat(currAccounts[this.state.toCurrency])) ? 0 : parseFloat(currAccounts[this.state.toCurrency]);

        //Sell
        if (sell && fromCurrencyAccountValue >= fromValue) {
            currAccounts[this.state.fromCurrency] = (fromAccountValue - fromValue).toFixed(2);
            currAccounts[this.state.toCurrency] = (toAccountValue + toValue).toFixed(2);
            this.setState({
                currencyAccounts: currAccounts
            })
        }
        //Buy
        else if (!sell && toCurrencyAccountValue >= toValue) {
            currAccounts[this.state.fromCurrency] = (fromAccountValue + fromValue).toFixed(2);
            currAccounts[this.state.toCurrency] = (toAccountValue - toValue).toFixed(2);
            this.setState({
                currencyAccounts: currAccounts
            })
        }
    }

    flipFlow = () => {
        this.setState({
            transactionFlowIsSell: !this.state.transactionFlowIsSell
        })
    };

    render() {
        return (
            <div className="main-container">
                <div className="main-body">
                    <div className="buy-sell mg10">
                        {"1 " + this.state.fromCurrency + " = "} {this.state.latestRates && this.state.latestRates.rates[this.state.toCurrency]} {this.state.toCurrency}
                    </div>



                    <div className="action-row mg10">
                        <NumberInput id="from"
                            onChange={fromValue => {
                                this.setState({ fromValue: fromValue }, () => {
                                    this.updateToValue();
                                })
                            }
                            }
                            value={this.state.fromValue ? this.state.fromValue : ""} />
                        {this.state.latestRates && <DropDown currency={this.state.fromCurrency} id={"fromCurrency"} rates={this.state.latestRates.rates} onChange={newFromCurrency => this.setState({
                            fromCurrency: newFromCurrency
                        }, () => {
                            this.getExchangeRate();
                        })} />}
                        <Balance id="balance" currencyAccounts={this.state.currencyAccounts} currency={this.state.fromCurrency} />
                    </div>

                    <div className="action-row mg10">
                        {this.state.latestRates && <NumberInput
                            id="to"
                            onChange={toValue => this.setState({ toValue: toValue },
                                () => {
                                    this.updateFromValue();
                                })}
                            value={this.state.toValue ? this.state.toValue : ""} />}

                        {this.state.latestRates && <DropDown
                            currency={this.state.toCurrency}
                            id={"toCurrency"}
                            rates={this.state.latestRates.rates}
                            onChange={newToCurrency => this.setState({
                                toCurrency: newToCurrency
                            }, () => {
                                this.updateToValue();
                            })} />}
                        <Balance id="balance" currencyAccounts={this.state.currencyAccounts} currency={this.state.toCurrency} />
                    </div>
                    <div className="exchange-container">
                        {this.state.transactionFlowIsSell && (
                            <div className="exchange-row">
                                <Button onClick={() => this.exchangeCurrencies(true)}> Sell {this.state.fromCurrency} for {this.state.toCurrency} </Button>
                                <div className="flip-button"><Button onClick={() => this.flipFlow(false)}> Buy </Button></div>
                            </div>
                        )}

                        {!this.state.transactionFlowIsSell && (
                            <div className="exchange-row">
                                <Button onClick={() => this.exchangeCurrencies(false)}> Buy {this.state.fromCurrency} with {this.state.toCurrency} </Button>
                                <div className="flip-button"><Button onClick={() => this.flipFlow(false)}> Sell </Button></div>
                                
                            </div>

                        )}
                    </div>

                </div>

            </div>
        )
    }
}

export default App;