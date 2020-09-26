import React, { useContext } from 'react';
import { List } from '@material-ui/core';
import { AddresseesContext } from '../../../context/Addressees';

import Addressee from './Addressee/Addressee';

const Addressees = ({ userId }) => {
  const { addressees } = useContext(AddresseesContext);

  return (
    <List>
      {addressees.map(({ id }, i) => (
        <Addressee key={id} id={id} addresseeIndex={i} />
      ))}
    </List>
  );
};

export default Addressees;
