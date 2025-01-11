import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
  Typography
} from '@mui/material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';

// We'll keep the same data structures for regions and categories
const regions = [
  { id: 'global', name: 'Global', flag: '🌎' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' },
  { id: 'usa', name: 'USA', flag: '🇺🇸' },
  { id: 'south-africa', name: 'South Africa', flag: '🇿🇦' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪' },
  { id: 'ukraine', name: 'Ukraine', flag: '🇺🇦' },
];

const categories = [
  'Food',
  'Health',
  'Education',
  'Religion',
  'Humanitarian',
  'Housing',
  'Environment',
];

const FavoriteButton = () => {
  // State management remains the same
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Handler functions stay largely the same
  const handleRegionToggle = (regionId) => {
    setSelectedRegions(prev =>
      prev.includes(regionId)
        ? prev.filter(id => id !== regionId)
        : [...prev, regionId]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSave = () => {
    console.log('Selected Regions:', selectedRegions);
    console.log('Selected Categories:', selectedCategories);
    setIsOpen(false);
  };

  // Filter regions based on search term
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* MUI Button with custom styling */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="contained"
        startIcon={<FavoriteIcon />}
        sx={{
          backgroundColor: '#FB1465',
          '&:hover': {
            backgroundColor: '#d11054',
          },
          textTransform: 'none',
          px: 2,
          py: 1
        }}
      >
        Favorite
      </Button>

      {/* MUI Dialog component */}
      <Dialog 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Subscribe to Updates
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: 4,
            mt: 2
          }}>
            {/* Regions Section */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Regions
              </Typography>
              
              <TextField
                fullWidth
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {filteredRegions.map((region) => (
                  <FormControlLabel
                    key={region.id}
                    control={
                      <Checkbox
                        checked={selectedRegions.includes(region.id)}
                        onChange={() => handleRegionToggle(region.id)}
                        size="small"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ marginRight: '8px' }}>{region.flag}</span>
                        <span>{region.name}</span>
                      </Box>
                    }
                  />
                ))}
              </Box>
            </Box>

            {/* Categories Section */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Categories
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {categories.map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        size="small"
                      />
                    }
                    label={category}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          {/* Save Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: '#FB1465',
                '&:hover': {
                  backgroundColor: '#d11054',
                },
                px: 4
              }}
            >
              Save
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FavoriteButton;