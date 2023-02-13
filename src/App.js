import React from 'react';


import Balance from './components/Balance';
import Form from './components/Form';
import LayOut from './components/LayOut';

import Transactions from './components/Transactions.js/Transactions';

function App() {
  return (
    <LayOut>
      <Balance />
      <Form />
      <Transactions />

    </LayOut>
  );
}

export default App;
