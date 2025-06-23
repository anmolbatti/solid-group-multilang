import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function AddNewProject() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    space:"",
    beds: '',
    baths: '',
    galleryTitle1: '',
    galleryDesc1: '',
    galleryTitle2: '',
    galleryDesc2: '',
    featuredImage: null,
    galleryImages: null,
    galleryBannerImage: null,
    language: 'en',
  });

  const [amenities, setAmenities] = useState([
    { title: '', image: null }
  ]);

  // amenities change
  const removeAmenityFields = (index) => {
    const newFields = amenities.filter((field, fieldIndex) => index !== fieldIndex);
    setAmenities(newFields);
  };

  const addAmenityFields = () => {
    setAmenities([...amenities, { title: '', image: null }]);
  };

  const handleAmenityChange = (index, event) => {
    const newFields = amenities.map((field, fieldIndex) => {
      if (index === fieldIndex) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setAmenities(newFields);
  };

  const handleAmenityImageChange = (index, event) => {
    const image = event.target.files;
    const newFields = amenities.map((field, fieldIndex) => {
      if (index === fieldIndex) {
        return { ...field, [event.target.name]: image[0] };
      }
      return field;
    });
    setAmenities(newFields);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value // Set files if they exist, otherwise set value
    }));
  };

  const handleImageUpload = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data?.image; // Assuming your API returns the image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('status', formData.status);
    data.append('space',formData.space);
    data.append('beds',formData.beds);
    data.append('baths',formData.baths);
    data.append('galleryTitle1',formData.galleryTitle1);
    data.append('galleryDesc1',formData.galleryDesc1);
    data.append('galleryTitle2',formData.galleryTitle2);
    data.append('galleryDesc2',formData.galleryDesc2);
    data.append('language',formData.language);

    // Handle multiple file uploads for images
    if (formData.galleryImages) {
      for (let i = 0; i < formData.galleryImages.length; i++) {
        data.append('galleryImages', formData.galleryImages[i]);
      }
    }
    // Single file upload for featured image
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage[0]);
    }

    if (formData.galleryBannerImage) {
      data.append('galleryBannerImage', formData.galleryBannerImage[0]);
    }

    if(amenities.length > 0) {
      var updatedAmenities = [];
      await Promise.all(amenities.map(async (item, index) => {
        if(item?.image){
            var imageData = await handleImageUpload(item?.image);
            updatedAmenities.push({title: item.title, image: imageData});
        }
      }));
      data.append('amenities', JSON.stringify(updatedAmenities));
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-project`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/projects');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
  };

  return (
    <div className="dashboard">
        <h1 className="dash_title">Dashboard</h1>
        <div className="main-section">
        <div className="back_btn_wrap">
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
          <div className="main-inner add_project_main">
            <form onSubmit={handleAddLocation} encType="multipart/form-data">
              <div className="add-post-form">
                <div className="add_field titleField">
                  <h2>Project Title</h2>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Description</h2>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Status</h2>
                  <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Space</h2>
                  <input
                    name="space"
                    value={formData.space}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Beds</h2>
                  <input
                    name="beds"
                    value={formData.beds}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Baths</h2>
                  <input
                    name="baths"
                    value={formData.baths}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field">
                  <h2>Gallery Images</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="galleryImages"
                        multiple
                        onChange={(e) => handleInputChange(e.target)}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
                
                <div className="add_field">
                  <h2>Featured Image</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="featuredImage"
                        onChange={(e) => handleInputChange(e.target)}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>

                <div className="add_field textareaField">
                  <h2>Gallery Title 1</h2>
                  <input
                    name="galleryTitle1"
                    value={formData.galleryTitle1}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Gallery Description 1</h2>
                  <input
                    name="galleryDesc1"
                    value={formData.galleryDesc1}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Gallery Title 2</h2>
                  <input
                    name="galleryTitle2"
                    value={formData.galleryTitle2}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field textareaField">
                  <h2>Gallery Description 2</h2>
                  <input
                    name="galleryDesc2"
                    value={formData.galleryDesc2}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field">
                  <h2>Gallery Banner Image</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="galleryBannerImage"
                        onChange={(e) => handleInputChange(e.target)}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>

                <div className="add_field">
                  <h2>Add Amenities</h2>
                  {amenities.map((field, index) => (
                    <div key={index} className="addItineraryFields">
                      <div className="add_field">
                        <h2>Amenity Title</h2>
                        <input
                          name="title"
                          type="text"
                          value={field.title}
                          placeholder="Title"
                          onChange={(event) => handleAmenityChange(index, event)}
                        />
                      </div>

                      <div className="add_field">
                        <h2>Amenity Image</h2>
                        <div className="form-group">
                          <div className="file-upload">
                            <input
                              type="file" 
                              className="form-control"
                              name="image"
                              onChange={(event) => handleAmenityImageChange(index, event)}
                              multiple
                            />
                            <i className="fa fa-camera i-pic-upload"></i>
                          </div>
                        </div>
                      </div>

                      <button type="button" onClick={() => removeAmenityFields(index)}>
                        Remove
                      </button>
                    </div>
                  ))}

                  <button type="button" onClick={addAmenityFields}>Add More Amenity</button>
                </div>

              </div>

              <div className="add_project">
                <button type="submit">Add Project</button>
              </div>

            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
    </div>
  );
}

export default AddNewProject;
