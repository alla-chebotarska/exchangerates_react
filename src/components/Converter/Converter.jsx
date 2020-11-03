import React from 'react';

import './Converter.css';

class Converter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amountA: 1,
            currA: 'USD',
            currB: 'UAH'
        }
    }

    amountAChanged = (event) => {
        this.setState({
            amountA: event.target.value
        })
    }


    currencyAChanged = (event) => {
        this.setState({
            currA: event.target.value
        })
    }

    calculate = () => {
        if (this.props.rates.length == 0) {
            return 0;
        }
        let rate = this.props.rates.find(item => item.cc === this.state.currA).rate;
        let convertedValue = this.state.amountA * rate;
        return convertedValue;
    }

    render() {
        const converterCurrensies = ["USD", "EUR", "PLN", "RUB", "UAH"];
        let curForConvert = this.props.rates.filter((item) => converterCurrensies.includes(item.cc))
            .map((item) =>
                <option key={item.cc}>{item.cc}</option>
            );

        let result = this.calculate();

        return (
            <div className={this.props.className}>
                <div>
                    <select value={this.state.currA} onChange={this.currencyAChanged}>{curForConvert}</select>
                    <input value={this.state.amountA} onChange={this.amountAChanged} />
                </div>
                <div>
                    <div>UAH {result}</div>
                </div>
            </div>
        )
    }
}

export default Converter;