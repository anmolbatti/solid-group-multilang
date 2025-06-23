import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function AddNewReview() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    featuredImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value // Set files if they exist, otherwise set value
    }));
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);

    // Single file upload for featured image
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage[0]);
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-review`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/reviews');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  return (
    <div className="dashboard">
        <h1 className="dash_title">Add Review</h1>
        <div className="main-section">
        <div className="back_btn_wrap">
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
          <div className="main-inner add_project_main">
            <form onSubmit={handleAddLocation} encType="multipart/form-data">
              <div className="add-post-form">
                <div className="add_field titleField">
                  <h2>Title</h2>
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
              </div>

              <div className="add_project">
                <button type="submit">Add Review</button>
              </div>

            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
    </div>
  );
}

export default AddNewReview;
