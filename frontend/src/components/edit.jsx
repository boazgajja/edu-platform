import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './edit.css'; // You'll need to create this CSS file
import axios from 'axios';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData: initialUserData } = location.state || {};
  
  // If no userData was passed, redirect back to profile
  useEffect(() => {
    if (!initialUserData) {
      navigate('/profile');
    }
  }, [initialUserData, navigate]);

  // State for form data
  const [formData, setFormData] = useState({
    name: initialUserData?.name || '',
    imageUrl: initialUserData?.imageUrl || '',
    rank: initialUserData?.rank || '',
    memberSince: initialUserData?.memberSince || ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // In a real app, you would upload this to a server
      // Here we're just creating a local URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imageUrl
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your API
    console.log('Submitting updated profile:', formData);
    
    // Update the user data (in a real app, this would happen after the API success)
    // For now, we'll just navigate back to the profile page
    // In a real implementation, you'd want to update the global state with the new user data
    navigate('/profile');
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate('/profile');
  };

  if (!initialUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <h2>Edit Profile</h2>
        
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label htmlFor="profile-image">Profile Image</label>
            <div className="image-upload-container">
              <div className="current-image">
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt={formData.name} 
                    className="profile-preview-image"
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <span>{formData.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div className="image-upload">
                <input
                  type="file"
                  id="profile-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="profile-image" className="file-label">
                  Choose Image
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rank">Rank</label>
            <input
              type="text"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="form-input"
              disabled
            />
            <small>Rank is determined by your points and cannot be edited directly.</small>
          </div>

          <div className="form-group">
            <label htmlFor="rank">Email</label>
            <input
              type="text"
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              className="form-input"
              disabled
            />
            <small>Email cant be changed or edited directly.</small>
          </div>

          

          <div className="form-group">
            <label htmlFor="memberSince">Member Since</label>
            <input
              type="text"
              id="memberSince"
              name="memberSince"
              value={formData.memberSince}
              onChange={handleChange}
              className="form-input"
              disabled
            />
            <small>Registration date cannot be changed.</small>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;