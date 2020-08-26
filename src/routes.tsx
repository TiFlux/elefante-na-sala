import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import EquipmentTicket from './pages/EquipmentTicket';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={EquipmentTicket} />
    </BrowserRouter>
  );
}

export default Routes;
