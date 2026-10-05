import {
  ArrowLeft,
  Building2,
  CheckCircle,
  MapPin,
  Phone,
  FileText,
  Sparkles,
  Send,
  ShieldCheck,
  Users,
  MessageCircle,
  Globe,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddBusiness() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    location: "",
    phone: "",
    website: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT BUSINESS TO MONGODB BACKEND
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBusiness = {
        name: formData.businessName,
        category: formData.category,
        subcategory: "Local Business",
        location: formData.location,

        phone: formData.phone
          ? `+91${formData.phone.replace(/\D/g, "")}`
          : null,

        whatsapp: null,

        website: formData.website || null,

        description:
          formData.about ||
          `${formData.businessName} is a local business listed on ASHRAYA.`,

        services: [],

        emoji: "🏪",
      };

      const response = await fetch(
        "http://localhost:5000/api/businesses",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newBusiness),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add business"
        );
      }

      console.log(
        "Business saved to MongoDB:",
        data.business
      );

      setSubmitted(true);
    } catch (error) {
      console.error(
        "ADD BUSINESS ERROR:",
        error
      );

      alert(
        "Unable to add business. Please make sure the ASHRAYA backend is running."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: "",
      category: "",
      location: "",
      phone: "",
      website: "",
      about: "",
    });

    setSubmitted(false);
  };

  return (
    <div className="add-business-page">

      {/* Background decoration */}
      <div className="add-business-bg-orb add-orb-one"></div>
      <div className="add-business-bg-orb add-orb-two"></div>
      <div className="add-business-grid"></div>

      {/* Top Navigation */}
      <header className="add-business-header">
        <div className="add-business-header-inner">

          <button
            className="add-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={17} />
            <span>Back Home</span>
          </button>

          <button
            className="add-brand"
            onClick={() => navigate("/")}
          >
            <span className="add-brand-mark">
              <Building2 size={18} />
            </span>

            <span>ASHRAYA</span>
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="add-business-main">

        <div className="add-business-container">

          {/* LEFT CONTENT */}
          <section className="add-business-intro">

            <div className="add-intro-top">

              <div className="add-intro-icon">
                <Building2 size={25} />
              </div>

              <div>
                <span className="add-section-label">
                  FOR BUSINESS OWNERS
                </span>

                <div className="add-mini-line"></div>
              </div>

            </div>

            <h1>
              Put your business
              <br />
              <em>on the map.</em>
            </h1>

            <p className="add-intro-description">
              Create your ASHRAYA digital business profile
              and help more customers discover what you do.
            </p>

            {/* Benefits */}
            <div className="add-benefits">

              <div className="add-benefit">
                <span className="add-benefit-icon">
                  <CheckCircle size={17} />
                </span>

                <div>
                  <strong>
                    Professional digital profile
                  </strong>

                  <span>
                    Give your business a strong online presence.
                  </span>
                </div>
              </div>

              <div className="add-benefit">
                <span className="add-benefit-icon">
                  <Users size={17} />
                </span>

                <div>
                  <strong>
                    Reach more local customers
                  </strong>

                  <span>
                    Help nearby customers discover your business.
                  </span>
                </div>
              </div>

              <div className="add-benefit">
                <span className="add-benefit-icon">
                  <MessageCircle size={17} />
                </span>

                <div>
                  <strong>
                    WhatsApp enquiries
                  </strong>

                  <span>
                    Make it easier for customers to connect.
                  </span>
                </div>
              </div>

              <div className="add-benefit">
                <span className="add-benefit-icon">
                  <Sparkles size={17} />
                </span>

                <div>
                  <strong>
                    Easy business discovery
                  </strong>

                  <span>
                    Let customers find you through ASHRAYA.
                  </span>
                </div>
              </div>

            </div>

            {/* Trust card */}
            <div className="add-trust-card">

              <div className="add-trust-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>
                  Built for local businesses
                </strong>

                <span>
                  A simple digital presence for your business.
                </span>
              </div>

            </div>

          </section>

          {/* RIGHT FORM */}
          <section className="add-business-form-wrapper">

            {!submitted ? (

              <form
                className="add-business-form"
                onSubmit={handleSubmit}
              >

                {/* Form Header */}
                <div className="add-form-header">

                  <div>

                    <span className="add-form-eyebrow">
                      GET STARTED
                    </span>

                    <h2>
                      Business Information
                    </h2>

                    <p>
                      Tell us a little about your business.
                    </p>

                  </div>

                  <div className="add-form-icon">
                    <FileText size={21} />
                  </div>

                </div>

                <div className="add-form-divider"></div>

                {/* BUSINESS NAME */}
                <div className="add-form-group">

                  <label htmlFor="businessName">
                    Business Name
                  </label>

                  <div className="add-input-wrapper">

                    <Building2 size={17} />

                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Example: Ashraya Home Bakery"
                    />

                  </div>

                </div>

                {/* CATEGORY */}
                <div className="add-form-group">

                  <label htmlFor="category">
                    Business Category
                  </label>

                  <div className="add-input-wrapper">

                    <Sparkles size={17} />

                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select category
                      </option>

                      <option value="Shops">
                        Shops
                      </option>

                      <option value="Food">
                        Food
                      </option>

                      <option value="Salons">
                        Salons
                      </option>

                      <option value="Education">
                        Education
                      </option>

                      <option value="Services">
                        Services
                      </option>

                      <option value="Healthcare">
                        Healthcare
                      </option>
                    </select>

                  </div>

                </div>

                {/* LOCATION */}
                <div className="add-form-group">

                  <label htmlFor="location">
                    Location
                  </label>

                  <div className="add-input-wrapper">

                    <MapPin size={17} />

                    <input
                      id="location"
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Karnataka"
                    />

                  </div>

                </div>

                {/* PHONE */}
                <div className="add-form-group">

                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <div className="add-input-wrapper phone-input">

                    <Phone size={17} />

                    <span className="country-code">
                      +91
                    </span>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                    />

                  </div>

                </div>

                {/* BUSINESS WEBSITE */}
                <div className="add-form-group">

                  <div className="add-label-row">

                    <label htmlFor="website">
                      Business Website
                    </label>

                    <span>
                      Optional
                    </span>

                  </div>

                  <div className="add-input-wrapper">

                    <Globe size={17} />

                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourbusiness.com"
                    />

                  </div>

                </div>

                {/* ABOUT BUSINESS */}
                <div className="add-form-group">

                  <div className="add-label-row">

                    <label htmlFor="about">
                      About Your Business
                    </label>

                    <span>
                      Optional
                    </span>

                  </div>

                  <div className="add-textarea-wrapper">

                    <FileText size={17} />

                    <textarea
                      id="about"
                      name="about"
                      rows="4"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder="Tell customers about your business..."
                    />

                  </div>

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="add-submit-button"
                >

                  <span>
                    Submit Business
                  </span>

                  <span className="add-submit-icon">
                    <Send size={16} />
                  </span>

                </button>

                <div className="add-form-note">

                  <ShieldCheck size={14} />

                  Your business information is submitted securely.

                </div>

              </form>

            ) : (

              /* SUCCESS STATE */

              <div className="add-success-card">

                <button
                  className="add-success-close"
                  onClick={handleReset}
                  aria-label="Close"
                >
                  <X size={17} />
                </button>

                <div className="add-success-icon">
                  <CheckCircle size={38} />
                </div>

                <span className="add-success-label">
                  ASHRAYA BUSINESS DIRECTORY
                </span>

                <h2>
                  Business Request
                  <br />
                  <em>Submitted.</em>
                </h2>

                <p>
                  Thank you for choosing ASHRAYA.
                  Your business information has been
                  received successfully.
                </p>

                {/* Submitted Information */}
                <div className="add-success-summary">

                  <div>
                    <span>
                      BUSINESS
                    </span>

                    <strong>
                      {formData.businessName}
                    </strong>
                  </div>

                  <div>
                    <span>
                      CATEGORY
                    </span>

                    <strong>
                      {formData.category}
                    </strong>
                  </div>

                  <div>
                    <span>
                      LOCATION
                    </span>

                    <strong>
                      {formData.location}
                    </strong>
                  </div>

                  {formData.website && (
                    <div>
                      <span>
                        WEBSITE
                      </span>

                      <strong>
                        {formData.website}
                      </strong>
                    </div>
                  )}

                </div>

                {/* Success Actions */}
                <div className="add-success-actions">

                  <button
                    onClick={() => navigate("/")}
                    className="success-home-button"
                  >
                    Back to Home
                  </button>

                  <button
                    onClick={() =>
                      navigate("/businesses")
                    }
                    className="success-directory-button"
                  >
                    Explore Businesses

                    <ArrowLeft size={15} />

                  </button>

                </div>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* Footer */}
      <footer className="add-business-footer">

        <span>
          © {new Date().getFullYear()} ASHRAYA
        </span>

        <span>
          Helping local businesses go digital.
        </span>

      </footer>

    </div>
  );
}

export default AddBusiness;
