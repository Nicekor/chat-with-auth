import React from 'react';
import {
  Typography,
  makeStyles,
  useMediaQuery,
  Box,
  Button,
  useTheme,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import img404 from '../../assets/img/404.svg';

const useStyles = makeStyles((theme) => {
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      paddingBottom: theme.measures.header.height,
    },
    innerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    img: {
      maxWidth: '10em',
    },
    btn: {
      margin: theme.spacing(1),
    },
  };
});

const NotFound = () => {
  const classes = useStyles();
  const minWidth768px = useMediaQuery('(min-width: 768px)');
  const theme = useTheme();

  return (
    <Box className={classes.wrapper}>
      <Box
        className={classes.innerWrapper}
        style={minWidth768px ? { flexDirection: 'row' } : null}
      >
        <img
          src={img404}
          alt="404 Page"
          className={classes.img}
          style={minWidth768px ? { marginRight: theme.spacing(3) } : null}
        />
        <Typography variant="h2" align="center">
          Page Not Found
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/"
        className={classes.btn}
        style={minWidth768px ? { alignSelf: 'flex-end' } : null}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
