import React from 'react';
import { Grid } from '@mui/material';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function GridLink({ link, title }) {
  return (
    <Grid item>
      <Link to={ link }>
        {title}
      </Link>
    </Grid>
  );
}

GridLink.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default GridLink;
