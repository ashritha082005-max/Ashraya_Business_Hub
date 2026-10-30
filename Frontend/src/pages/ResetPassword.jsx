import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset link.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setSuccess(
        "Your password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to reset password. Please try again."
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
        <button
          className="login-back-button"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">
              <Sparkles size={22} />
            </div>

            <span>ASHRAYA</span>
          </div>

          <div className="login-heading">
            <h1>Reset Password</h1>

            <p>
              Create a new secure password for your
              ASHRAYA account.
            </p>
          </div>

          <div className="login-security">
            <ShieldCheck size={17} />

            <span>
              Your account security matters to us
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label>New Password</label>

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
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
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
            </div>

            <div className="login-field">
              <label>Confirm Password</label>

              <div className="login-input-wrapper">
                <LockKeyhole
                  size={19}
                  className="login-input-icon"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

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

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
              style={{
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Resetting Password..."
                : "Reset Password"}
            </button>
          </form>

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

export default ResetPassword;
