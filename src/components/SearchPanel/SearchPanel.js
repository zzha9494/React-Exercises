import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SvgIcon } from '@mui/material';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

function SearchPanel() {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField
        id="search"
        type="search"
        InputProps={{
          startAdornment: <SvgIcon component={SearchIcon} inheritViewBox />,
        }}
        placeholder="Search"
        fullWidth
      />
    </Box>
  );
}

export default SearchPanel;
