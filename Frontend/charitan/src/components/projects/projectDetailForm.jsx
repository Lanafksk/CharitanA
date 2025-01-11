import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Chip,
  Grid,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ProjectDetailForm = ({ open, onClose, project, onSave }) => {
  // Initial form state
  const [formData, setFormData] = useState({
    projectTitle: project?.projectTitle || '',
    category: project?.category || 'Health',
    country: project?.country || 'Global',
    fundingGoal: project?.fundingGoal || '',
    description: project?.description || '',
    images: project?.images || []
  });

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    
    setFormData(prevData => ({
      ...prevData,
      images: [...prevData.images, ...newImages]
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box>
          <Typography variant="h6" component="div">
            Project Detail
          </Typography>
          <Chip 
            label="Available" 
            size="small"
            sx={{ 
              bgcolor: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '0.75rem',
              height: 24
            }} 
          />
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            {/* Project Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Environment">Environment</MenuItem>
              </TextField>
            </Grid>

            {/* Country */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="Global">Global</MenuItem>
                <MenuItem value="Local">Local</MenuItem>
              </TextField>
            </Grid>

            {/* Funding Goal */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Funding Goal"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Project Image/Video
              </Typography>
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  minHeight: 100,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1
                }}
              >
                {formData.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                ))}
                <IconButton
                  component="label"
                  sx={{
                    width: 80,
                    height: 80,
                    border: '1px dashed #ccc',
                    borderRadius: 1
                  }}
                >
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                  <AddPhotoAlternateIcon />
                </IconButton>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ width: '100%', textAlign: 'right', mt: 1 }}
                >
                  {formData.images.length}/15
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Box>
            <Button
              startIcon={<PauseIcon />}
              variant="outlined"
              color="error"
              sx={{ mr: 1 }}
            >
              Halt
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="inherit"
            >
              Delete
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ 
              bgcolor: '#fb1465',
              '&:hover': {
                bgcolor: '#d4105a'
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectDetailForm;