import React from 'react';
import { Avatar } from '@material-ui/core';

const AvatarWithLetter = ({ personName, ...props }) => {
  return <Avatar {...props}>{personName ? personName.charAt(0) : null}</Avatar>;
};

export default AvatarWithLetter;
