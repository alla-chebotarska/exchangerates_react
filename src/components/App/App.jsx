import React from 'react';
import Converter from '../Converter/Converter';
import ExchangeRatesTable from '../ExchangeRatesTable/ExchangeRatesTable';

import './App.css';

const App = () => {
    return(
        <div className='grid-container'>
            <ExchangeRatesTable className="exchange-rates-table"></ExchangeRatesTable>
            <Converter className="converter"></Converter>
        </div>
    )
}

export default App;