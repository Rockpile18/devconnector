import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address_line1: "",
      address_line2: "",
      county: "",
      relationship_status: "",
      homeowner: Boolean,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      address_line1: this.state.address_line1,
      address_line2: this.state.address_line2,
      county: this.state.county,
      relationship_status: this.state.relationship_status,
      homeowner: this.state.homeowner
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for relationship status
    const options = [
      { label: "Select Relationship Status", value: 0 },
      { label: "Single", value: "Single" },
      { label: "Married", value: "Married" }
      { label: "Divorced", value: "Divorced" }
      { label: "Widowed", value: "Widowed" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Address Line 1"
                  name="address_line1"
                  value={this.state.address_line1}
                  onChange={this.onChange}
                  error={errors.address_line1}
                  info="(Boston, MA 02101)"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Employer or Company"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one."
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <SelectListGroup
                  placeholder="Relationship Status"
                  name="relationship_status"
                  value={this.state.relationship_status}
                  onChange={this.onChange}
                  error={errors.relationship_status}
                  options={options}
                  info="Relationship Status"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
