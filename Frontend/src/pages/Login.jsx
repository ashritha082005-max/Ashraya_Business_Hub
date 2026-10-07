import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      localStorage.setItem("ashrayaToken", data.token);

      localStorage.setItem(
        "ashrayaUser",
        JSON.stringify(data.user)
      );

      navigate("/businesses");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
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
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="login-card">

          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">
              <Sparkles size={22} />
            </div>

            <span>ASHRAYA</span>
          </div>

          <div className="login-heading">
            <h1>Welcome Back</h1>

            <p>
              Sign in to continue your journey with ASHRAYA.
            </p>
          </div>

          {/* Security badge */}
          <div className="login-security">
            <ShieldCheck size={17} />

            <span>
              Secure & trusted local business platform
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
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">

              <div className="login-label-row">
                <label>Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                >
                  Forgot password?
                </button>
              </div>

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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

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

            {/* Remember me */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />

                <span>
                  Remember me
                </span>
              </label>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>

          </form>

          {/* CREATE ACCOUNT */}
          <div
            style={{
              textAlign: "center",
              marginTop: "18px",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            Don't have an ASHRAYA account?{" "}

            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                border: "none",
                background: "transparent",
                padding: 0,
                margin: 0,
                fontWeight: 700,
                cursor: "pointer",
                color: "#1e3a8a",
              }}
            >
              Create Account
            </button>
          </div>

          {/* Divider */}
          <div className="login-divider">
            <span>OR</span>
          </div>

          {/* Business owner */}
          <div className="login-business-box">

            <div>
              <strong>
                Are you a business owner?
              </strong>

              <p>
                Put your business on ASHRAYA.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/add-business")
              }
            >
              List Business
            </button>

          </div>

          {/* Footer */}
          <p className="login-footer-text">
            By continuing, you agree to ASHRAYA's
            terms and privacy policy.
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;