import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

function AddNewLanguage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
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
    data.append('code', formData.code);
    data.append('name', formData.name);

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-language`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/languages');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add language');
    }
  };

  return (
    <div className="dashboard">
        <h1 className="dash_title">Add language</h1>
        <div className="main-section">
        <div className="back_btn_wrap">
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
          <div className="main-inner add_project_main">
            <form onSubmit={handleAddLocation} encType="multipart/form-data">
              <div className="add-post-form">
                <div className="add_field titleField">
                  <h2>Name</h2>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>

                <div className="add_field titleField">
                  <h2>Code</h2>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={(e) => handleInputChange(e.target)}
                    required
                  />
                </div>
              </div>

              <div className="add_project">
                <button type="submit">Add language</button>
              </div>

            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
    </div>
  );
}

export default AddNewLanguage;
