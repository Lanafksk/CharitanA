import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Edit as EditIcon, AttachMoney, AssignmentTurnedIn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '24px',
  maxWidth: '800px',
  margin: 'auto',
  marginTop: '40px', 
  marginBottom: '40px',
});

const ProfileHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '32px',
});

// Updated StatisticBox with new styling
const StatisticBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  marginBottom: '32px',
});

// Updated StatItem to include icon styling
const StatItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& .MuiTypography-h4': {
    color: '#000',
    marginBottom: '8px',
  },
  '& .MuiTypography-subtitle1': {
    color: '#666',
  },
  '& .MuiSvgIcon-root': {
    color: '#FB1465',
    fontSize: '2rem',
    marginBottom: '16px',
  }
});

const InfoSection = styled(Box)({
  position: 'relative',
  textAlign: 'left',
  '& .edit-button': {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  '& .section-title': {
    textAlign: 'left',
    marginBottom: '24px',
  },
  '& .info-grid': {
    textAlign: 'left',
  }
});

const UserProfile = ({
  type,
  profileData,
  onUpdateProfile,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  const handleEditClick = () => {
    setEditedData(profileData);
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    onUpdateProfile(editedData);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (field) => (event) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value,
    });
  };

  const getProfileFields = () => {
    if (type === 'charity') {
      return [
        { label: 'Charity Name', value: profileData.charityName, field: 'charityName' },
        { label: 'Phone Number', value: profileData.phoneNumber, field: 'phoneNumber' },
        { label: 'Email Address', value: profileData.emailAddress, field: 'emailAddress' },
        { label: 'Country', value: profileData.country, field: 'country' },
        { label: 'Address', value: profileData.address, field: 'address' },
        { label: 'Type', value: profileData.type, field: 'type' },
        { label: 'Tax Code', value: profileData.taxCode, field: 'taxCode' },
      ];
    } else {
      return [
        { label: 'First Name', value: profileData.firstName, field: 'firstName' },
        { label: 'Last Name', value: profileData.lastName, field: 'lastName' },
        { label: 'Phone Number', value: profileData.phoneNumber, field: 'phoneNumber' },
        { label: 'Email Address', value: profileData.emailAddress, field: 'emailAddress' },
        { label: 'Country', value: profileData.country, field: 'country' },
        { label: 'Address', value: profileData.address, field: 'address' },
      ];
    }
  };

  return (
    <StyledCard>
      <CardContent>
        {/* Profile Header */}
        <ProfileHeader>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              marginBottom: 2,
              backgroundColor: '#f5f5f5',
            }}
          />
          <Typography variant="h5" gutterBottom>
            {type === 'charity' ? profileData.charityName : `${profileData.firstName} ${profileData.lastName}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {type === 'charity' ? 'Charity - Individual' : 'Donor'}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {profileData.country}
          </Typography>
        </ProfileHeader>

        {/* Statistics with updated icons */}
        <StatisticBox>
            <StatItem>
                <AttachMoney style={{ fontSize: '60px' }} /> 
                <Typography variant="h4">${profileData.totalAmount}</Typography>
                <Typography variant="subtitle1">TOTAL AMOUNT</Typography>
            </StatItem>
            <StatItem>
                <AssignmentTurnedIn style={{ fontSize: '60px' }} /> 
                <Typography variant="h4">{profileData.totalProjects}</Typography>
                <Typography variant="subtitle1">TOTAL PROJECTS</Typography>
            </StatItem>
        </StatisticBox>

        {/* Personal Information with left alignment */}
        <InfoSection>
          <Typography variant="h6" className="section-title">
            Personal Information
          </Typography>
          <IconButton
            className="edit-button"
            onClick={handleEditClick}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <Grid container spacing={3} className="info-grid">
            {getProfileFields().map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="subtitle2" color="textSecondary">
                  {field.label}
                </Typography>
                <Typography variant="body1">{field.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </InfoSection>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              {getProfileFields().map((field, index) => (
                <TextField
                  key={index}
                  label={field.label}
                  fullWidth
                  margin="normal"
                  value={editedData[field.field]}
                  onChange={handleInputChange(field.field)}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)} style={{ color: 'black' }}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" style={{ backgroundColor: '#FB1465', color: 'white' }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </StyledCard>
  );
};

export default UserProfile;