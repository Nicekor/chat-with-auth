import React from 'react';
import { Box } from '@material-ui/core';
import AddresseesProvider from '../../context/Addressees';

import SearchAddressee from './SearchAddressee/SearchAddressee';
import Addressees from './Addressees/Addressees';

const Chats = () => {
  return (
    <Box display="flex" flexDirection="column" mt={1} px={2}>
      <AddresseesProvider>
        <SearchAddressee />
        <Addressees />
      </AddresseesProvider>
    </Box>
  );
};

export default Chats;
