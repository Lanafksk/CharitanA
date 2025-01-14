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
  Alert,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createProjects } from '../../utils/api/projects/createProject';

// Define categories as a constant to maintain consistency and make updates easier
const PROJECT_CATEGORIES = [
  'Food',
  'Health',
  'Education',
  'Environment',
  'Religion',
  'Humanitarian',
  'Housing',
  'Other'
];

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    category: '', // Initialize as empty string for controlled Select component
    country: 'Global',
    fundingGoal: '',
    monthlyDonation: false,
    description: '',
    projectFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 200 * 1024 * 1024) { // 200MB limit
      setFormData((prev) => ({
        ...prev,
        projectFile: file,
      }));
    } else {
      setError('File size should be less than 200MB');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate category selection
    if (!formData.category) {
      setError('Please select a project category');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let mediaUrl = null;
      if (formData.projectFile) {
        mediaUrl = await handleFileUpload(formData.projectFile);
      }

      const projectData = {
        title: formData.projectTitle,
        category: formData.category,
        country: formData.country,
        target_amount: parseFloat(formData.fundingGoal),
        description: formData.description,
        status: 'Running',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        region: formData.country === 'Global' ? 'Global' : 'Specific',
        images: mediaUrl ? [mediaUrl] : [],
        videos: [],
      };

      const response = await createProjects(projectData);
      console.log('Project created successfully:', response);
      setSuccess(true);
      
      // Reset form
      setFormData({
        projectTitle: '',
        category: '',
        country: 'Global',
        fundingGoal: '',
        monthlyDonation: false,
        description: '',
        projectFile: null,
      });
    } catch (err) {
      setError(err.message || 'Failed to create project');
      console.error('Error creating project:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>Project created successfully!</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          label="Project Title"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleInputChange}
          margin="normal"
          variant="outlined"
        />

        {/* Updated Category field to use Select component */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            name="category"
            label="Category"
            onChange={handleInputChange}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
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
            <MenuItem value="Israel">Israel</MenuItem>
            <MenuItem value="Palestine">Palestine</MenuItem>
            {/* Add more countries as needed */}
          </Select>
        </FormControl>

        <TextField
          required
          fullWidth
          label="Funding Goal"
          name="fundingGoal"
          type="number"
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
          required
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
            bgcolor: 'white',
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
            {formData.projectFile ? formData.projectFile.name : 'Upload a file or drag and drop PNG, JPG, MP4 up to 200MB'}
          </Typography>
        </Paper>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
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
          {loading ? 'Creating Project...' : 'Create Project'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateProjectForm;