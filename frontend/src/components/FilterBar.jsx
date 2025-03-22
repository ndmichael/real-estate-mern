import { useState } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import properties from "../data/properties";

const FilterBar = ({ setFilteredProperties }) => {
  const [category, setCategory] = useState("");

  const handleFilterChange = (event) => {
    setCategory(event.target.value);
    if (event.target.value === "") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter((p) => p.category === event.target.value));
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth sx={{ width: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="buy">Buy</MenuItem>
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="shortlet">Short Let</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
