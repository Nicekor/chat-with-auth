import React, { useContext } from 'react';
import { Avatar } from '@material-ui/core';
import { UserAvatarContext } from '../../../context/UserAvatarCtx';

const UserAvatar = () => {
  const { avatar, firstName } = useContext(UserAvatarContext);

  return (
    <Avatar alt={firstName} src={avatar}>
      {firstName ? firstName.charAt(0) : null}
    </Avatar>
  );
};

export default UserAvatar;
