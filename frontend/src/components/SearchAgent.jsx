// components/SearchAgent.jsx
import React from 'react';
import { TextField } from '@mui/material';

const SearchAgent = ({ searchQuery, setSearchQuery }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search agents by name, specialty, or area..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchAgent;
