import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to process your request."
        );
      }

      setSuccess(
        "If an account exists with this email, a password reset link has been sent."
      );

      setEmail("");

    } catch (error) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Background decoration */}
      <div className="login-bg-circle login-bg-circle-one"></div>
      <div className="login-bg-circle login-bg-circle-two"></div>

      <div className="login-container">

        {/* Back button */}
        <button
          className="login-back-button"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {/* Forgot Password Card */}
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

            <h1>Forgot Password?</h1>

            <p>
              Enter your email address and we'll
              send you a secure password reset link.
            </p>

          </div>

          {/* Security badge */}
          <div className="login-security">

            <ShieldCheck size={17} />

            <span>
              Secure password recovery
            </span>

          </div>

          <form onSubmit={handleSubmit}>

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
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  required
                />

              </div>

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

            {/* Success */}
            {success && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  color: "#15803d",
                  padding: "11px 13px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  marginBottom: "18px",
                }}
              >
                {success}
              </div>
            )}

            {/* Send Reset Link */}
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>

          </form>

          {/* Footer */}
          <p className="login-footer-text">

            Remember your password?{" "}

            <button
              type="button"
              onClick={() => navigate("/login")}
              style={{
                border: "none",
                background: "none",
                color: "#1e293b",
                fontWeight: "700",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Sign In
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;