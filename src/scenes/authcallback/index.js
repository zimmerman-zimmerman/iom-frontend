import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Callback extends React.Component {
  componentDidMount = () => {
    this.props.auth0Client.handleAuthentication().then((results) => {
      if (results.idToken) {
        this.props.history.replace("/");
      }
    });
  };

  render = () => {
    return (
      <div>
        <div style={{ width: "100%", textAlign: "center" }}>
          Loading profile...
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.currentUser,
  };
};

export default connect(null)(withRouter(Callback));
