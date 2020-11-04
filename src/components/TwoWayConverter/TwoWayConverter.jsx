import React from 'react';

import './TwoWayConverter.css';

class TwoWayConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rates: {},
            baseCurrency: "USD",
            convertTo: "CAD",
            amountA: 1,
            amountB: ''
        }
    }

    componentDidMount() {
        this.downloadRates(this.state.baseCurrency);
    }

    getKeys = function (obj) {
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        return keys;
    }


    downloadRates(curr) {
        console.log("Downloading...");
        const ratesUrl = `https://api.exchangeratesapi.io/latest?base=${curr}`;
        fetch(ratesUrl).then(async (response) => {
            let json = await response.json();
            this.setState({
                rates: json.rates
            });
            this.reCalculateAmountB();
        }).catch((err) => {
            alert("Failed to load rates!");
        });
    }

    changeBaseCurrencyState = (event) => {
        this.setState({
            baseCurrency: event.target.value
        })
        this.downloadRates(event.target.value);
    }

    changeconvertToCurrency = (event) => {
        this.setState({
            convertTo: event.target.value
        })
        this.reCalculateAmountA()
    }

    reCalculateAmountA() {
        let rate = this.state.rates[this.state.convertTo];
        let res = (this.state.amountB / rate).toFixed(3);
        this.setState({
            amountA: res
        })
    }

    reCalculateAmountB() {
        let rate = this.state.rates[this.state.convertTo];
        let res = (this.state.amountA * rate).toFixed(3);
        this.setState({
            amountB: res
        })
    }

    onChangeAmountA = (event) => {
        this.setState({
            amountA: event.target.value
        })
        this.reCalculateAmountB();
    }

    onChangeAmountB = (event) => {
        this.setState({
            amountB: event.target.value
        })
        this.reCalculateAmountA();
    }

    render() {
        let currencyNames = [];
        if (this.state.rates) {
            currencyNames = this.getKeys(this.state.rates);
        }

        let currencyOptions = currencyNames.map(item => {
            return <option key={item}>{item}</option>
        })

        return (
            <div className={this.props.className}>
                <h4>Currency converter</h4>
                <div>
                    <select
                        value={this.state.baseCurrency}
                        onChange={this.changeBaseCurrencyState}>
                        {currencyOptions}
                    </select>
                    <input
                        type='number'
                        value={this.state.amountA}
                        onChange={this.onChangeAmountA}></input>
                </div>
                <div>
                    <select
                        onChange={this.changeconvertToCurrency}>
                        {currencyOptions}
                    </select>
                    <input
                        type='number'
                        value={this.state.amountB}
                        onChange={this.onChangeAmountB}></input>
                </div>
            </div>
        )
    }
}

export default TwoWayConverter;