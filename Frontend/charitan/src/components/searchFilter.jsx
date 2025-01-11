import React, { useState } from 'react';

// import FavoriteButton from './projects/favoriteButton';


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
  Paper,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { 
  Search as SearchIcon,
  School as EducationIcon,
  LocalHospital as HealthIcon,
  Park as EnvironmentIcon,
  Computer as TechnologyIcon,
  FilterAltOff as ClearFiltersIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';



// Helper object for category icons
const categoryIcons = {
  'Education': <EducationIcon />,
  'Health': <HealthIcon />,
  'Environment': <EnvironmentIcon />,
  'Technology': <TechnologyIcon />
};

// Helper object for country flags (using country codes)
const countryFlags = {
  'Vietnam': '🇻🇳',
  'USA': '🇺🇸',
  'South Africa': '🇿🇦',
  'Germany': '🇩🇪',
  'Ukraine': '🇺🇦',
  'Israel': '🇮🇱'
};

// Custom Filter Button Component
const FilterButton = ({ label, options, value, onChange, isCountry, isCategory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  // Filter options based on search term, but always keep "No Filter" at the top
  const filteredOptions = ['No Filter', ...options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )];

  const renderOptionLabel = (option) => {
    // Special handling for "No Filter" option
    if (option === 'No Filter') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <Typography>No Filter</Typography>
        </Box>
      );
    }

    if (isCountry) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontSize: '1.2rem' }}>{countryFlags[option]}</span>
          <Typography>{option}</Typography>
        </Box>
      );
    }
    if (isCategory) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            {categoryIcons[option]}
          </ListItemIcon>
          <Typography>{option}</Typography>
        </Box>
      );
    }
    return option;
  };

  // Convert empty string (no filter) to a more user-friendly display
  const displayValue = value || label;

  return (
    <>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          backgroundColor: 'white',
          color: value ? 'black' : 'text.secondary',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
          textTransform: 'none',
          mr: 2
        }}
      >
        {isCountry && value && (
          <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>
            {countryFlags[value]}
          </span>
        )}
        {isCategory && value && (
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            {categoryIcons[value]}
          </ListItemIcon>
        )}
        {displayValue} ▾
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
            value={value || 'No Filter'}
            onChange={(e) => {
              // Convert "No Filter" selection to empty string
              const selectedValue = e.target.value === 'No Filter' ? '' : e.target.value;
              onChange(selectedValue);
              handleClose();
            }}
          >
            {filteredOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={renderOptionLabel(option)}
              />
            ))}
          </RadioGroup>
        </Box>
      </Popover>
    </>
  );
};

// Main Search and Filter Component
const SearchFilter = ({ onSearch, onFilter, hasResults = true, isDiscovery = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
      country: '',
      category: '',
      goal: '',
      status: ''
    });
  
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
  
    const handleClearAllFilters = () => {
      const clearedFilters = {
        country: '',
        category: '',
        goal: '',
        status: ''
      };
      setFilters(clearedFilters);
      onFilter(clearedFilters);
      setSearchTerm('');
      onSearch('');
    };
  
    const hasActiveFilters = Object.values(filters).some(filter => filter !== '');
  
    return (
      <Box sx={{ mb: 4 }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>  {/* New wrapper Box for search and favorite */}
          <Paper
            elevation={3}
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              flex: 1,          // Changed from width: '100%' to flex: 1
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
          {/* {isDiscovery && <FavoriteButton />}   */}
        </Box>
  
        {/* Filters Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 3 }}>
          <FilterButton
            label="Country"
            options={filterOptions.country}
            value={filters.country}
            onChange={(value) => handleFilterChange('country', value)}
            isCountry={true}
          />
          <FilterButton
            label="Category"
            options={filterOptions.category}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            isCategory={true}
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
          
          {hasActiveFilters && (
            <>
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              <Button
                onClick={handleClearAllFilters}
                startIcon={<ClearFiltersIcon />}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Clear All
              </Button>
            </>
          )}
        </Box>
  
        {/* No Results Message */}
        {!hasResults && (
          <Box 
            sx={{ 
              textAlign: 'center',
              py: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              borderRadius: 2
            }}
          >
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              There is no project that matches these criteria 😔
            </Typography>
            {(hasActiveFilters || searchTerm) && (
              <Button
                onClick={handleClearAllFilters}
                variant="text"
                sx={{ mt: 2 }}
              >
                Clear all filters and try again
              </Button>
            )}
          </Box>
        )}
      </Box>
    );
  };
  
  export default SearchFilter;