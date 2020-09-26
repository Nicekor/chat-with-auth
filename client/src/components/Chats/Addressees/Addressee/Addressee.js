import React, { useContext } from 'react';
import { ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';

import ListItemLink from '../../../UI/ListItemLink/ListItemLink';
import AvatarWithLetter from '../../../UI/AvatarWithLetter/AvatarWithLetter';
import { AddresseesContext } from '../../../../context/Addressees';

const useStyles = makeStyles((theme) => {
  return {
    addressee: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    dotIcon: {
      marginRight: theme.spacing(0.5),
      fontSize: '0.15rem',
    },
  };
});

const Addressee = ({ id, addresseeIndex }) => {
  const classes = useStyles();
  const { addressees } = useContext(AddresseesContext);
  const addresseeName = [
    addressees[addresseeIndex].firstName,
    addressees[addresseeIndex].lastName,
  ].join(' ');

  return (
    <ListItemLink
      to={{
        pathname: `/chat/${id}`,
        state: {
          addresseeIndex,
        },
      }}
      listItemProps={{ className: classes.addressee }}
    >
      <ListItemAvatar>
        <AvatarWithLetter
          alt={addresseeName}
          src={addressees[addresseeIndex].avatar}
          personName={addresseeName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={addresseeName}
        primaryTypographyProps={{ noWrap: true }}
        secondary={addressees[addresseeIndex].lastMessage}
        secondaryTypographyProps={{ noWrap: true }}
      />
      {/* <Box display="flex" flexDirection="column" alignItems="flex-end">
        {lastMessageSeen && <DoneAllIcon />}
        <Box display="flex" alignItems="center">
          <FiberManualRecordIcon fontSize="small" className={classes.dotIcon} />
          <Typography variant="body2" color="textSecondary">
            Mon
          </Typography>
        </Box>
      </Box> */}
    </ListItemLink>
  );
};

export default Addressee;
