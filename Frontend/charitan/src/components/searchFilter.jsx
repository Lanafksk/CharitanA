import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment,
  Popover,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  InputBase,
  Paper
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Custom Filter Button Component
const FilterButton = ({ label, options, value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          textTransform: 'none',
          mr: 2
        }}
      >
        {label} ▾
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { width: '250px', maxHeight: '400px' }
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
          <RadioGroup
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              handleClose();
            }}
          >
            {filteredOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      </Popover>
    </>
  );
};

// Main Search and Filter Component
const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    goal: '',
    status: ''
  });

  // Sample data for filters - replace with your actual options
  const filterOptions = {
    country: ['Vietnam', 'USA', 'South Africa', 'Germany', 'Ukraine', 'Israel'],
    category: ['Education', 'Health', 'Environment', 'Technology'],
    goal: ['Under $10,000', '$10,000-$50,000', 'Over $50,000'],
    status: ['Available', 'In Progress', 'Completed']
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Main Search Bar */}
      <Paper
        elevation={3}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          mb: 3,
          borderRadius: '8px'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search your Project name..."
          value={searchTerm}
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#e91e63' }} />
            </InputAdornment>
          }
        />
      </Paper>

      {/* Filter Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <FilterButton
          label="Country"
          options={filterOptions.country}
          value={filters.country}
          onChange={(value) => handleFilterChange('country', value)}
        />
        <FilterButton
          label="Category"
          options={filterOptions.category}
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
        />
        <FilterButton
          label="Goal"
          options={filterOptions.goal}
          value={filters.goal}
          onChange={(value) => handleFilterChange('goal', value)}
        />
        <FilterButton
          label="Status"
          options={filterOptions.status}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
      </Box>
    </Box>
  );
};

export default SearchFilter;