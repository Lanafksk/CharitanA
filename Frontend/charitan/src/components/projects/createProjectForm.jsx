import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    category: '',
    country: 'Global',
    fundingGoal: '',
    monthlyDonation: false,
    description: '',
    projectFile: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 200 * 1024 * 1024) { // 200MB limit
      setFormData((prev) => ({
        ...prev,
        projectFile: file,
      }));
    } else {
      alert('File size should be less than 200MB');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // The main container now uses Paper component for the white background
  return (
    <Paper 
      elevation={0} // Removes the default shadow
      sx={{
        maxWidth: 600,
        mx: 'auto', // Centers the form horizontally
        backgroundColor: 'white', // Explicit white background
        borderRadius: 2, // Slightly rounded corners
        p: 3, // Padding around the form
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Project Title"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={formData.country}
            name="country"
            onChange={handleInputChange}
            startAdornment={
              <InputAdornment position="start">
                <PublicIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="Global">Global</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Funding Goal"
          name="fundingGoal"
          value={formData.fundingGoal}
          onChange={handleInputChange}
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            name="monthlyDonation"
            value={formData.monthlyDonation}
            onChange={(e) => handleInputChange({
              target: {
                name: 'monthlyDonation',
                value: e.target.value === 'true'
              }
            })}
          >
            <FormControlLabel 
              value={true}
              control={<Radio />}
              label="Monthly Donation (This project shall automatically process monthly donations on the 15th date of each month)"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
        />

        <Paper 
          variant="outlined" 
          sx={{
            mt: 2,
            p: 3,
            textAlign: 'center',
            border: '2px dashed #ccc',
            cursor: 'pointer',
            bgcolor: 'white', // Ensures the upload area maintains white background
          }}
          onClick={() => document.getElementById('project-file-input').click()}
        >
          <input
            type="file"
            id="project-file-input"
            hidden
            accept="image/png,image/jpeg,video/mp4"
            onChange={handleFileChange}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography>
            Upload a file or drag and drop PNG, JPG, MP3 up to 200MB
          </Typography>
        </Paper>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ 
            mt: 3,
            py: 1.5,
            backgroundColor: '#e91e63',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#d81b60'
            }
          }}
        >
          Create Project
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateProjectForm;