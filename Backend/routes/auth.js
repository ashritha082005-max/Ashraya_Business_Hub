const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();

/* =====================================================
   GMAIL TRANSPORTER
===================================================== */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/* =====================================================
   REGISTER
===================================================== */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message:
        "Account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to create account.",
    });
  }
});

/* =====================================================
   LOGIN
===================================================== */

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.toLowerCase().trim();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});

/* =====================================================
   FORGOT PASSWORD
===================================================== */

router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email address is required.",
        });
      }

      const normalizedEmail =
        email.toLowerCase().trim();

      const user =
        await User.findOne({
          email: normalizedEmail,
        });

      /*
        Always return the same message when
        the account does not exist.
      */
      if (!user) {
        return res.json({
          success: true,
          message:
            "If an account exists with this email, a password reset link has been sent.",
        });
      }

      /* Generate secure reset token */
      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      /* Hash token before saving */
      const hashedToken =
        crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");

      user.resetPasswordToken =
        hashedToken;

      /*
        Token expires after 15 minutes.
      */
      user.resetPasswordExpires =
        new Date(
          Date.now() +
            15 * 60 * 1000
        );

      await user.save();

      /*
        Reset link sent to user's email.
      */
      const resetLink =
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      console.log(
        "PASSWORD RESET LINK:",
        resetLink
      );

      await transporter.sendMail({
        from:
          `"ASHRAYA Business Hub" <${process.env.EMAIL_USER}>`,

        to: user.email,

        subject:
          "ASHRAYA - Reset Your Password",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            background: #faf8f5;
            padding: 40px 20px;
          ">

            <div style="
              max-width: 560px;
              margin: auto;
              background: white;
              border-radius: 20px;
              padding: 35px;
              box-shadow:
                0 10px 35px
                rgba(0,0,0,0.08);
            ">

              <h1 style="
                color: #1e293b;
                margin-bottom: 8px;
              ">
                ASHRAYA
              </h1>

              <h2 style="
                color: #172033;
              ">
                Reset Your Password
              </h2>

              <p style="
                color: #64748b;
                line-height: 1.7;
              ">
                We received a request to reset
                your ASHRAYA account password.
              </p>

              <p style="
                color: #64748b;
                line-height: 1.7;
              ">
                Click the button below to create
                a new password.
              </p>

              <div style="
                margin: 30px 0;
              ">

                <a
                  href="${resetLink}"
                  style="
                    display: inline-block;
                    background: #1e293b;
                    color: white;
                    text-decoration: none;
                    padding: 14px 24px;
                    border-radius: 10px;
                    font-weight: bold;
                  "
                >
                  Reset Password
                </a>

              </div>

              <p style="
                color: #94a3b8;
                font-size: 13px;
                line-height: 1.6;
              ">
                This link expires in 15 minutes.
              </p>

              <p style="
                color: #94a3b8;
                font-size: 13px;
                line-height: 1.6;
              ">
                If you did not request a password
                reset, you can safely ignore this email.
              </p>

            </div>

          </div>
        `,
      });

      res.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });

    } catch (error) {
      console.error(
        "FORGOT PASSWORD ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to send password reset email.",
      });
    }
  }
);

/* =====================================================
   RESET PASSWORD
===================================================== */

router.post(
  "/reset-password/:token",
  async (req, res) => {
    try {
      const {
        password,
      } = req.body;

      const {
        token,
      } = req.params;

      if (!password) {
        return res.status(400).json({
          success: false,
          message:
            "New password is required.",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must contain at least 6 characters.",
        });
      }

      if (!token) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid reset token.",
        });
      }

      const hashedToken =
        crypto
          .createHash("sha256")
          .update(token)
          .digest("hex");

      const user =
        await User.findOne({
          resetPasswordToken:
            hashedToken,

          resetPasswordExpires: {
            $gt: new Date(),
          },
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "Reset link is invalid or has expired.",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      user.password =
        hashedPassword;

      /*
        Invalidate reset token
        after successful reset.
      */
      user.resetPasswordToken =
        null;

      user.resetPasswordExpires =
        null;

      await user.save();

      res.json({
        success: true,
        message:
          "Password reset successfully.",
      });

    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error.message
      );

      res.status(500).json({
        success: false,
        message:
          "Unable to reset password.",
      });
    }
  }
);

module.exports = router;
