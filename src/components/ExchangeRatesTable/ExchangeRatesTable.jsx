import React from 'react';

import './ExchangeRatesTable.css';

class ExchangeRatesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rates: [],
            expanded: false
        }
    }

    componentDidMount() {
        const ratesUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
        fetch(ratesUrl).then(async (response) => {
            let json = await response.json();
            this.setState({
                rates: json
            })
        }).catch((err) => {
            alert("Failed to load rates!");
        })
    }

    render() {
        const priorityCurrencies = ["USD", "EUR", "PLN", "RUB"];
        let rows;
        if (this.state.expanded) {
            rows = this.state.rates
                .map((item) =>
                    <tr key={item.cc}><td>{item.cc}</td><td>{item.txt}</td><td>{item.rate}</td></tr>
                );
        } else {
            rows = this.state.rates
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
                {rows.length == 0 ? "Loading" :
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
                }
                <div className='button-container'>
                    <button onClick={onExpandChange}>{this.state.expanded ? "Show less" : "Show more"}</button>
                </div>
            </div>
        )
    }
}

export default ExchangeRatesTable;