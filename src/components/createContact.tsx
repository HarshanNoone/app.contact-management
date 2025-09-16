import { useState } from "react";
import axios from "axios";
import "../App.css"

interface CreateContactProps {
  onNavigateBack: () => void;
}

function CreateContact({ onNavigateBack }: CreateContactProps) {
  const [contact, setContact] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const apiUrl = "https://api-contact-management-6e3t.onrender.com";

    axios
      .post(`${apiUrl}/create-contact`, {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        country_code: formData.get("country_code"),
        phone: formData.get("phone"),
        group: formData.get("group"),
      })
      .then((res: any) => {
        setContact(res.data);
        // alert("Contact created successfully!");
        onNavigateBack();
      })
      .catch((err) => {
        console.error("Error creating contact:", err);
        alert("Error creating contact. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="create-contact-container">
      <div className="create-header">
        <button className="back-btn" onClick={onNavigateBack}>
           Back to Contacts
        </button>
        <h1 className="create-title">Create New Contact</h1>
      </div>
      
      <div className="create-form-wrapper">
        <div className="avatar-section">
          <img 
            src="src/assets/contact-avatar.jpg" 
            alt="avatar" 
            className="contact-avatar"
          />
        </div>
        
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input 
              type="text" 
              id="first_name"
              name="first_name" 
              required
              placeholder="Enter first name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input 
              type="text" 
              id="last_name"
              name="last_name" 
              required
              placeholder="Enter last name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country_code">Country Code</label>
            <select id="country_code" name="country_code" required>
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+86">+86 (China)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Mobile Number</label>
            <input 
              type="tel" 
              id="phone"
              name="phone" 
              required
              placeholder="Enter mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="group">Group</label>
            <select id="group" name="group">
              <option value="">Select a group (optional)</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Office">Office</option>
              <option value="Colleagues">Colleagues</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={onNavigateBack}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Save Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateContact
