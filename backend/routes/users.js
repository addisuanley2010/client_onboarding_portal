const express = require("express");
const db = require("../models");
const router = express.Router();
const { sendStatusChangeEmail, sendRegisterEmail } = require("../config/sendStatusChangeEmail");
const {
  authentication,
  authorization,
} = require("../middleware/authMiddleware");
const { comparePassword } = require("../utils/comparePassword");
const { generateToken, generateUrlToken } = require("../utils/generateToken");
const { hashPassword } = require("../utils/hashPassword");

// Define routes
router.post("/", async (req, res) => {
  try {
    const urltoken1 = await generateUrlToken();
   const urltoken =await req.body.contactPerson.trim().slice(0, 4) + urltoken1;
    req.body.urltoken = urltoken;
    const password = await hashPassword("12345");
    req.body.password = password;
    const newUser = await db.User.create(req.body);
    await sendRegisterEmail(
      newUser.email,
      newUser.status,
      newUser.urltoken,
      newUser.contactPerson
    );
 
    res
      .status(201) 
      .json({
        newUser,
        message: "Client Registered  successfully!",
        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password", success: false });
    }

    const token = await generateToken(user.role, user.email);
    return res.json({
      message: "User logged in successfully!",
      success: true,
      token,
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error", success: false });
  }
});
router.delete("/:email", authentication, authorization("admin"), async (req, res) => {
  try {
    const { email } = req.params;
    const user = await db.User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    await user.destroy();
    return res.json({ message: "User deleted successfully", success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
});


router.get("/dashboard", authentication, async (req, res) => {
  try {
    // Get total number of users
    const totalUsers = await db.User.count();

    // Get users by role
    const usersByRole = await db.User.findAll({
      attributes: ['role', [db.sequelize.fn('COUNT', '*'), 'count']],
      group: ['role']
    });

    // Get users by status
    const usersByStatus = await db.User.findAll({
      attributes: ['status', [db.sequelize.fn('COUNT', '*'), 'count']],
      group: ['status']
    });

    // Get recent users (last 5)
    const recentUsers = await db.User.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'email', 'role', 'status', 'createdAt']
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        usersByRole,
        usersByStatus,
        recentUsers
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching dashboard data",
      error: error.message 
    });
  }
});




router.get("/check/auth", authentication, async (req, res) => {
  //  const user = req.user;
  const user = await db.User.findOne({
    where: {
      email: req.user.email,
    },
  });
  const token = await generateToken(user.role, user.email);

  res.send({
    success: true,
    message: "authenticated user",
    user,
    token: token,
    isAuthenticated: true,
  });
});

router.put(
  "/update/status",
  authentication,
  authorization("admin"),
  async (req, res) => {
    try {
      const { status, email } = req.body;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      await db.User.update(
        { status },
        {
          where: {
            email: email,
          },
        }
      );
      await sendStatusChangeEmail(
        email,
        status,
        user.urltoken,
        user.contactPerson
      );
      return res.json({
        message: "Status updated successfully",
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error", success: false });
    }
  }
);
router.get("/onboarding/:token", async (req, res) => {
  const { token } = req.params;
  const client = await db.User.findOne({
    where: {
      urltoken: token,
    },
  });
  if (client) {
    res.send(`
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    background-color: #f5f5f5;
                  }
                  .container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    max-width: 800px;
                    margin: 0 auto;
                  }
                  h1 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                  }
                  .info-section {
                    margin-bottom: 20px;
                    padding: 15px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                  }
                  .info-title {
                    color: #3498db;
                    font-size: 1.2em;
                    margin-bottom: 10px;
                  }
                  .info-content {
                    color: #34495e;
                    line-height: 1.6;
                  }
                  .status {
                    display: inline-block;
                    padding: 5px 10px;
                    border-radius: 15px;
                    background-color: #2ecc71;
                    color: white;
                    font-size: 0.9em;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Welcome to Teamwork Software !</h1>
              
                  <div class="info-section">
                    <div class="info-title">Company Information</div>
                    <div class="info-content">
                      <p>Company Name: ${client.companyName}</p>
                      <p>Industry: ${client.industryType}</p>
                      <p>Company Size: ${client.companySize}</p>
                    </div>
                  </div>

                  <div class="info-section">
                    <div class="info-title">Contact Details</div>
                    <div class="info-content">
                      <p>Contact Person: ${client.contactPerson}</p>
                      <p>Email: ${client.email}</p>
                      <p>Phone: ${client.phone}</p>
                    </div>
                  </div>

                  <div class="info-section">
                    <div class="info-title">Project Details</div>
                    <div class="info-content">
                      <p>Service Needed: ${client.serviceNeeded}</p>
                      <p>Timeline: ${client.expectedTimeline}</p>
                      <p>Budget Range: ${client.budgetRange}</p>
                      <p>Description: ${client.projectDescription}</p>
                    </div>
                  </div>

                  <div class="info-section">
                    <div class="info-title">Account Status</div>
                    <div class="info-content">
                      <span class="status">${client.status}</span>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `);
  } else {
    res.send(`
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          margin: 40px;
                          background-color: #f5f5f5;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          min-height: 100vh;
                        }
                        .container {
                          background-color: white;
                          padding: 30px;
                          border-radius: 10px;
                          box-shadow: 0 0 10px rgba(0,0,0,0.1);
                          max-width: 600px;
                          width: 100%;
                          text-align: center;
                        }
                        h1 {
                          color: #e74c3c;
                          margin-bottom: 20px;
                        }
                        .error-icon {
                          font-size: 64px;
                          color: #e74c3c;
                          margin-bottom: 20px;
                        }
                        .error-message {
                          color: #2c3e50;
                          font-size: 18px;
                          line-height: 1.6;
                          margin-bottom: 30px;
                        }
                        .home-link {
                          display: inline-block;
                          padding: 12px 24px;
                          background-color: #3498db;
                          color: white;
                          text-decoration: none;
                          border-radius: 5px;
                          transition: background-color 0.3s;
                        }
                        .home-link:hover {
                          background-color: #2980b9;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <div class="error-icon">⚠️</div>
                        <h1>Client Not Found</h1>
                        <div class="error-message">
                          <p>We couldn't find the client you're looking for.</p>
                          <p>The requested client does not exist in our records.</p>
                        </div>
                        <a href="https://clientonlineportal.netlify.app/" class="home-link">Return to Homepage</a>
                      </div>
                    </body>
                  </html>
                `);
  }
});

module.exports = router;
 