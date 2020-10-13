import React from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

import ListItemLink from '../../../UI/ListItemLink/ListItemLink';

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

const Addressee = ({ id, name, avatar }) => {
  const classes = useStyles();

  return (
    <ListItemLink
      to={{
        pathname: `/chat/${id}`,
        state: {
          id,
          name,
          avatar,
        },
      }}
      listItemProps={{ className: classes.addressee }}
    >
      <ListItemAvatar>
        <Avatar
          alt={name + ' avatar'}
          src={`http://192.168.1.157:5000/avatars/${avatar}`}
        >
          {name ? name.charAt(0) : null}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        primaryTypographyProps={{ noWrap: true }}
        secondary={'This will display the last message from the chat'}
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
