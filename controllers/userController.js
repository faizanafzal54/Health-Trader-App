const {
  sendResponse,
  generateToken,
  generateRandomLink,
  dayDifference,
} = require("../utils/utils");
const userDao = require("../daos/userDao");
const mycircleDao = require("../daos/mycircleDao");

const bcrypt = require("bcryptjs");
const passport = require("passport");
const transporter = require("../utils/transporter");
const saltRounds = 10;

module.exports = {
  register: async (req, res) => {
    try {
      const {
        role,
        firstName,
        middleName,
        lastName,
        phone,
        email,
        password,
        dateOfBirth,
        emergencyPhone,
        address,
        city,
        state,
        country,
        zip,
      } = req.body;
      const prevAccount = await userDao.findOneByEmail(email);

      if (prevAccount === null) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userDao.create({
          firstName,
          middleName,
          lastName,
          phone,
          email,
          password: hashedPassword,
          dateOfBirth,
          emergencyPhone,
          role,
          address,
          city,
          state,
          country,
          zip,
        });

        sendResponse(null, req, res, { newUser });
      } else {
        const err = new Error("Email Already Exists");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      console.log(err);
      sendResponse(err, req, res, err);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const resetPasswordLink = generateRandomLink();
      const user = await userDao.findOneAndUpdate(
        { email },
        { resetPasswordLink }
      );
      const mailOptions = {
        from: "cranehawk54@gmail.com",
        to: `${email}`,
        subject: "Reset Password -- Health Trader App",
        html: `<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Custom Code From Scratch</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
           
        </head>
        <body style="margin:0; padding:10px; background-color: #F0F0F0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="640" style="border-collapse: collapse;" bgcolor="#ffffff" >
              <tr style="">
                <td style="padding:40px">
                  
                  </td>
              </tr>
              <tr>
                <td style="padding-left:40px; padding-right:40px; padding-top:0px;">
                  <p style="display:block; margin:0;   font-family:field-work-light; font-weight: normal; font-size:21px; line-height: 35px;">
                    Hello, <br/>
                    Your Reset Password Link is <br/><a href="http://localhost:3000/resetPassword/${resetPasswordLink}">click here</a>
                </td>
              </tr>
              <tr style="display:block; border-top:2px solid green;">
                <td style="padding-left:40px;padding-right:40px; padding-bottom:40px;">
                  <p style="display:block; margin:0; color:#808080; padding-top:10px;  padding-right:20px; font-family:field-work-thin; font-weight: normal; font-size:12px; line-height: 24px;">Copyright &#xa9; ${new Date().getFullYear()} , All rights reserved.</p>
                </td>
              </tr>
            </table>
        </body>
      </html>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      sendResponse(null, req, res, {
        message: "Reset Password Link has been sent to the email",
      });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { link, password } = req.body;
      const hash = await bcrypt.hash(password, saltRounds);
      const user = await userDao.findOneAndUpdate(
        { resetPasswordLink: link },
        { password: hash, resetPasswordLink: "" }
      );
      sendResponse(null, req, res, { user });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  emailLogin: async (req, res) => {
    try {
      const { email, isRememberMe, password } = req.body;
      const user = await userDao.findOneByEmail(email);

      if (user !== null) {
        if (user.isActive === false) {
          let err = new Error("Account has been deleted");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
          return;
        }
        if (!user.password && !user.isProfileComplete) {
          let err = new Error("User has not registed completely");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
          return;
        }
        if (bcrypt.compareSync(password, user.password)) {
          const data = {
            ip: req.ip,
            role: user.role,
            user: {
              _id: user._id,
              name: user.firstName + " " + user.lastName,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role,
              phone: user.phone,
              image: user.image,
            },
          };
          const token = generateToken(data, "7d");
          const refreshToken = generateToken(
            {
              _id: user._id,
              ip: req.ip,
              role: user.role,
            },
            "365d"
          );
          // await setRefreshToken(data.user.id, refreshToken);
          sendResponse(null, req, res, {
            token,
            refreshToken,
            user: data.user,
          });
        } else {
          let err = new Error("Password is incorrect");
          err.statusCode = 403;
          sendResponse(err, req, res, err);
        }
      } else {
        let err = new Error("Email does not exist");
        err.statusCode = 404;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  verifyResetLink: async (req, res) => {
    try {
      const { resetPasswordLink } = req.query;
      const user = await userDao.findOneWhere({ resetPasswordLink });
      if (user === null) {
        let err = new Error("Reset password link is invalid");
        err.statusCode = 404;
        sendResponse(err, req, res, err);
      } else {
        sendResponse(null, req, res, user);
      }
    } catch (err) {
      console.log(err);
      sendResponse(err, req, res, err);
    }
  },
  verifyInviteLink: async (req, res) => {
    try {
      const { inviteLink } = req.query;
      const user = await userDao.findOneWhere({ inviteLink });
      if (user === null) {
        let err = new Error("Invalid link");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      } else {
        if (dayDifference(new Date(), user.inviteLinkDate) < 4) {
          sendResponse(null, req, res, user);
        } else {
          let err = new Error("Link expired");
          err.statusCode = 400;
          sendResponse(err, req, res, err);
        }
      }
    } catch (err) {
      console.log(err);
      sendResponse(err, req, res, err);
    }
  },
  inviteUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        circle,
        notes,
        phone,
        email,
        userId,
        notifications,
      } = req.body;
      const account = await userDao.findOneByEmail(email);
      if (account === null) {
        const newUser = await userDao.create({
          firstName,
          lastName,
          phone,
          email,
          isProfileComplete: false,
          role: 1,
          invitedBy: userId,
          inviteLink: generateRandomLink(),
          inviteLinkDate: new Date(),
          notifications,
        });
        const newCircle = await mycircleDao.create({
          userId,
          friendId: newUser._id,
          connectionType: circle,
          status: "",
        });
        sendResponse(null, req, res, { newUser, newCircle });
        const mailOptions = {
          from: "cranehawk54@gmail.com",
          to: `${email}`,
          subject: "Invitation for registeration-- Health Trader App",
          html: `<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>Custom Code From Scratch</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
             
          </head>
          <body style="margin:0; padding:10px; background-color: #F0F0F0;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="640" style="border-collapse: collapse;" bgcolor="#ffffff" >
                <tr style="">
                  <td style="padding:40px">
                    
                    </td>
                </tr>
                <tr>
                  <td style="padding-left:40px; padding-right:40px; padding-top:0px;">
                    <p style="display:block; margin:0;   font-family:field-work-light; font-weight: normal; font-size:21px; line-height: 35px;">
                      Hello, <br/>
                      Your app registration Link is <br/><a href="http://localhost:3000/register/${
                        newUser.inviteLink
                      }">click here</a>
                  </td>
                </tr>
                <tr style="display:block; border-top:2px solid green;">
                  <td style="padding-left:40px;padding-right:40px; padding-bottom:40px;">
                    <p style="display:block; margin:0; color:#808080; padding-top:10px;  padding-right:20px; font-family:field-work-thin; font-weight: normal; font-size:12px; line-height: 24px;">Copyright &#xa9; ${new Date().getFullYear()} , All rights reserved.</p>
                  </td>
                </tr>
              </table>
          </body>
        </html>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      } else {
        let err = new Error("Email Already exists");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  EditUser: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        circle,
        notes,
        phone,
        email,
        ownerId, //invited by
        notifications,
        userId, // user to edit
      } = req.body;
      const user = await userDao.findOneAndUpdate(
        { _id:userId },
        { firstName, lastName, circle, notes, phone, email, notifications }
      );

      const mycircle = await mycircleDao.findOneAndUpdate(
        { userId:ownerId, friendId: userId },
        {
          connectionType: circle,
        }
      );
      sendResponse(null, req, res, { user, mycircle });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { userId,circleId } = req.query;
      const user = await userDao.findByIdAndDelete(userId);
      const myCircle = await mycircleDao.findByIdAndDelete(circleId);
      sendResponse(null, req, res, { user,myCircle });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  completeRegistration: async (req, res) => {
    try {
      const {
        inviteLink,
        email,
        firstName,
        lastName,
        phone,
        middleName,
        gender,
        dateOfBirth,
        address1,
        password,
        city,
        state,
        zipCode,
      } = req.body;
      const account = await userDao.findOneWhere({ email, inviteLink });

      if (account !== null) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(password);
        const registeredUser = await userDao.findOneAndUpdate(
          { email },
          {
            email,
            firstName,
            lastName,
            phone,
            middleName,
            gender,
            dateOfBirth,
            address: address1,
            password: hashedPassword,
            city,
            state,
            zipCode,
            isProfileComplete: true,
            inviteLink: "",
            inviteLinkDate: null,
          }
        );
        sendResponse(null, req, res, { user: registeredUser });
      } else {
        let err = new Error("Link is not valid");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      const user = await findByRefreshToken(refreshToken);
      if (user === null) {
        const err = new Error("Refresh token is invalid");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      } else {
        const data = {
          ip: req.ip,
          role: user.role,
          user: {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            image: user.image,
          },
        };
        const token = generateToken(data, "7d");
        const refreshToken = generateToken(
          {
            id: user.id,
            ip: req.ip,
            role: user.role,
          },
          "365d"
        );
        await setRefreshToken(data.user.id, refreshToken);
        sendResponse(null, req, res, { token, refreshToken, user: data.user });
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  uploadProfilePicture: async (req, res) => {
    try {
      const { userId } = req.body;
      const image = req.files?.image;

      const user = await findByPk(userId);
      if (user !== null) {
        let uploadParams = {
          Bucket: "heirshare/user-images",
          Key: "",
          Body: "",
        };
        uploadParams.Body = req.files?.image?.data;
        uploadParams.Key = `${userId}_profilepic_${req.files?.image?.name}`;
        const uploadedFile = await s3.upload(uploadParams).promise();
        console.log(uploadedFile);
        const userRes = await updateImage(userId, uploadedFile.Key);
        sendResponse(null, req, res, { user: userRes[1][0] });
      } else {
      }
      //upload image to S3
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  removeProfilePicture: async (req, res) => {
    try {
      const { userId, key } = req.body;
      var params = { Bucket: "heirshare", Key: key };
      const userRes = await updateImage(userId, null);
      sendResponse(null, req, res, { user: userRes[1][0] });

      const deletedObj = await s3.deleteObject(params).promise();
      console.log(deletedObj);
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  deactivateAccount: async (req, res) => {
    try {
      const { userId } = req.query;
      const deactivateRes = await deactivate(userId);
      sendResponse(null, req, res, { user: deactivateRes[1][0] });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id, displayName, firstName, lastName, phone } = req.body;
      const userRes = await update(id, {
        displayName,
        firstName,
        lastName,
        phone,
      });
      sendResponse(null, req, res, { user: userRes[1][0] });
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { userId, oldPassword, newPassword } = req.body;
      const user = await findByPk(userId);
      const result = bcrypt.compareSync(oldPassword, user.password);
      if (result) {
        const hash = await bcrypt.hash(newPassword, 10);
        if (bcrypt.compareSync(newPassword, user.password)) {
          let err = new Error("New and old password can not be same");
          err.statusCode = 400;
          sendResponse(err, req, res, err);
        } else {
          const userRes = await update(userId, { password: hash });
          sendResponse(null, req, res, { user: userRes });
        }
      } else {
        let err = new Error("Old password is incorrect");
        err.statusCode = 400;
        sendResponse(err, req, res, err);
      }
    } catch (err) {
      sendResponse(err, req, res, err);
    }
  },
  facebookSignin: (req, res) => {
    passport.authenticate(
      "facebook-token",
      async function (err, response, currentStep) {
        if (err === null) {
          console.log(currentStep, response);
          if (currentStep === "login") {
            const data = {
              ip: req.ip,
              role: response.role,
              user: {
                _id: response._id,
                name: response.firstName + " " + response.lastName,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                role: response.role,
                phone: response.phone,
                image: response.image,
              },
            };
            const token = generateToken(data, "7d");
            const refreshToken = generateToken(
              {
                _id: response._id,
                ip: req.ip,
                role: response.role,
              },
              "365d"
            );
            // await setRefreshToken(data.user.id, refreshToken);
            sendResponse(null, req, res, {
              token,
              refreshToken,
              user: response,
            });
          } else {
            const registeredUser = await userDao.create({
              firstName: response._json.first_name,
              middleName: "",
              lastName: response._json.last_name,
              phone: "",
              email: response._json.email,
              socialId: response.id,
              socialProvider: response.provider,
              password: "",
              dateOfBirth: null,
              emergencyPhone: "",
              role: 1,
              address: "",
              city: "",
              state: "",
              country: "",
              zip: "",
            });
            const data = {
              ip: req.ip,
              role: registeredUser.role,
              user: {
                _id: registeredUser._id,
                name: registeredUser.firstName + " " + registeredUser.lastName,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
                role: registeredUser.role,
                phone: registeredUser.phone,
                image: registeredUser.image,
              },
            };
            const token = generateToken(data, "7d");
            const refreshToken = generateToken(
              {
                _id: registeredUser._id,
                ip: req.ip,
                role: registeredUser.role,
              },
              "365d"
            );
            // await setRefreshToken(data.user.id, refreshToken);
            sendResponse(null, req, res, {
              token,
              refreshToken,
              user: registeredUser,
            });
          }
        } else {
          sendResponse(err, req, res, err);
        }
      }
    )(req, res);
  },
};
