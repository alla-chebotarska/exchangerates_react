import React from 'react';
import Converter from '../Converter/Converter';
import ExchangeRatesTable from '../ExchangeRatesTable/ExchangeRatesTable';

import './App.css';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            rates: []
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
        return (
            <div className='grid-container'>
                <ExchangeRatesTable className="exchange-rates-table" rates={this.state.rates}/>
                <Converter className="converter" rates={this.state.rates}/>
            </div>
        )
    }
}

export default App;