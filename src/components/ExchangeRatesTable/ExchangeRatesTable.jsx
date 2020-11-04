import { Button } from '@blueprintjs/core';
import React from 'react';

import './ExchangeRatesTable.css';

class ExchangeRatesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        const priorityCurrencies = ["USD", "EUR", "PLN", "RUB"];
        let rows;
        if (this.state.expanded) {
            rows = this.props.rates
                .map((item) =>
                    <tr key={item.cc}><td>{item.cc}</td><td>{item.txt}</td><td>{item.rate}</td></tr>
                );
        } else {
            rows = this.props.rates
                .filter((item) => priorityCurrencies.includes(item.cc))
                .map((item) =>
                    <tr key={item.cc}><td>{item.cc}</td><td>{item.txt}</td><td>{item.rate}</td></tr>
                );
        }

        let onExpandChange = () => {
            this.setState({
                expanded: !this.state.expanded
            })
        }

        return (
            <div className={this.props.className}>
                <h4>Exhange rate table</h4>
                {rows.length === 0 ? "Loading" :
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>Currency name</th>
                                    <th>Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                        <div className='button-container'>
                            <Button 
                            onClick={onExpandChange}>
                                {this.state.expanded ? "Show less" : "Show more"}
                            </Button>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default ExchangeRatesTable;