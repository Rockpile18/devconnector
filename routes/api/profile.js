const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfileInput = require("../../validation/profile");

// Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Private

//TODO make this private using token access
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Private

//TODO make this private using token access
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   POST api/profile
// @desc    Create or Edit users profile
// @access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle; // This check if (re.body.handle) is sent in from the form. If so, assign it to profileFields.handle
    if (req.body.address_line1)
      profileFields.address_line1 = req.body.address_line1;
    if (req.body.address_line2)
      profileFields.address_line2 = req.body.address_line2;
    if (req.body.county) profileFields.county = req.body.county;
    if (req.body.relationship_status)
      profileFields.relationship_status = req.body.relationship_status;
    if (req.body.homeowner) profileFields.homeowner = req.body.homeowner;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create:

        // 1) Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists.";
            res.status(400).json(errors);
          }

          // 2) Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
