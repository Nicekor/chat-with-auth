import React from 'react';
import { Avatar } from '@material-ui/core';

const AvatarWithLetter = ({ personName, ...props }) => {
  return <Avatar {...props}>{personName.charAt(0)}</Avatar>;
};

export default AvatarWithLetter;
