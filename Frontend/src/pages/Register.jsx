import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/register`,
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            role: "user",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      alert(
        "Account created successfully! You can now sign in."
      );

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError(
        error.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-bg-circle login-bg-circle-one"></div>
      <div className="login-bg-circle login-bg-circle-two"></div>

      <div className="login-container">

        {/* Back */}
        <button
          className="login-back-button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">
              <Sparkles size={22} />
            </div>

            <span>ASHRAYA</span>
          </div>

          {/* Heading */}
          <div className="login-heading">
            <h1>Create Account</h1>

            <p>
              Join ASHRAYA and connect with
              your local digital community.
            </p>
          </div>

          {/* Security */}
          <div className="login-security">
            <ShieldCheck size={17} />

            <span>
              Your account is securely protected
            </span>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="login-field">

              <label>Full Name</label>

              <div className="login-input-wrapper">

                <User
                  size={19}
                  className="login-input-icon"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

              </div>
            </div>

            {/* Email */}
            <div className="login-field">

              <label>Email Address</label>

              <div className="login-input-wrapper">

                <Mail
                  size={19}
                  className="login-input-icon"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />

              </div>
            </div>

            {/* Password */}
            <div className="login-field">

              <label>Password</label>

              <div className="login-input-wrapper">

                <LockKeyhole
                  size={19}
                  className="login-input-icon"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              <small
                style={{
                  color: "#94a3b8",
                  display: "block",
                  marginTop: "7px",
                  fontSize: "11px",
                }}
              >
                Password must contain at least
                6 characters.
              </small>

            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  color: "#be123c",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  marginBottom: "18px",
                }}
              >
                {error}
              </div>
            )}

            {/* Create Account */}
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Divider */}
          <div className="login-divider">
            <span>OR</span>
          </div>

          {/* Existing account */}
          <div className="login-business-box">

            <div>
              <strong>
                Already have an account?
              </strong>

              <p>
                Sign in to your ASHRAYA account.
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

          {/* Footer */}
          <p className="login-footer-text">
            By creating an account, you agree to
            ASHRAYA's terms and privacy policy.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;