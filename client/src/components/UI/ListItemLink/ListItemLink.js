import React, { useMemo } from 'react';
import { ListItem } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const ListItemLink = ({ to, children, listItemProps }) => {
  const renderLink = useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem {...listItemProps} button component={renderLink}>
        {children}
      </ListItem>
    </li>
  );
};

export default ListItemLink;
