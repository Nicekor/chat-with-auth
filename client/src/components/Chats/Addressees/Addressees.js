import React, { useContext } from 'react';
import { List } from '@material-ui/core';
import { AddresseesContext } from '../../../context/AddresseesCtx';

import Addressee from './Addressee/Addressee';

const Addressees = () => {
  const [addressees] = useContext(AddresseesContext);

  return (
    <List>
      {addressees.map(({ id, ...rest }) => (
        <Addressee key={id} id={id} {...rest} />
      ))}
    </List>
  );
};

export default Addressees;
