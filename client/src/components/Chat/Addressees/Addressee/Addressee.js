import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    addressee: {
      cursor: 'pointer',
    },
  };
});

const Addressee = ({
  addresseeName,
  previewMessage,
  addresseeAvatar,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <ListItem
      alignItems="center"
      className={[classes.addressee, className].join(' ')}
      {...props}
    >
      <ListItemAvatar>
        <Avatar alt={addresseeName} src={addresseeAvatar} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" color="textPrimary">
            {addresseeName}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="textSecondary" noWrap>
            {previewMessage}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default Addressee;
