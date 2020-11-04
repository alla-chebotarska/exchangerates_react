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
        let convertedValue = (this.state.amountA * rate).toFixed(3);
        return convertedValue;
    }

    render() {
        const converterCurrensies = ["USD", "EUR", "PLN", "RUB", "UAH"];
        let currencyChoice = this.props.rates
            .map((item) =>
                <option key={item.cc}>{item.cc}</option>
            );

        let result = this.calculate();

        return (
            <div className={this.props.className}>
                <div className='baseCurrency'>
                    <select 
                        value={this.state.currA} 
                        onChange={this.currencyAChanged} 
                        className='selectCurrency'>
                            {currencyChoice}
                    </select>
                    <input 
                        value={this.state.amountA} 
                        onChange={this.amountAChanged} 
                        type='number'
                        className='input-amountA' />
                </div>
                <div className='convertedamountB'>
        <div>{this.state.amountA} {this.state.currA} is equal to <b>{result}</b> UAH</div>
                </div>
            </div>
        )
    }
}

export default Converter;