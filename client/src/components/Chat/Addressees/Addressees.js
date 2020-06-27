import React, { useState } from 'react';
import { Paper, List, makeStyles } from '@material-ui/core';
import Scrollbar from '../../UI/Scrollbar/Scrollbar';
import { addressees } from '../../../utils/dummyData';
import Addressee from './Addressee/Addressee';

const useStyles = makeStyles((theme) => {
  return {
    addresseesWrapper: {
      width: '50%',
      height: `calc(100vh - ${theme.measures.headerMaxHeight})`,
      overflow: 'auto',
      backgroundColor: theme.palette.background.default,
    },
    addresseesList: {
      margin: theme.spacing(0, 2),
    },
    selected: {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
    },
  };
});

const Addressees = () => {
  const classes = useStyles();
  const [addresseeSelected, setAddresseeSelected] = useState(1);

  // this event should also render the addressee specific component
  const onAddresseeClick = (id) => {
    setAddresseeSelected(id);
  };

  return (
    <Paper className={classes.addresseesWrapper}>
      <Scrollbar>
        <List className={classes.addresseesList}>
          {addressees.map(({ id, firstName, lastName, lastMessage }) => {
            return (
              <Addressee
                key={id}
                addresseeName={[firstName, lastName].join(' ')}
                previewMessage={lastMessage}
                className={id === addresseeSelected ? classes.selected : null}
                onClick={() => onAddresseeClick(id)}
              />
            );
          })}
        </List>
      </Scrollbar>
    </Paper>
  );
};

export default Addressees;
