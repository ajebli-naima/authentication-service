import React, { Component } from "react";


class ChangePasswordConfirmation extends Component {
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
          <p>You can now log in here <a href="/login">Log in</a> </p>
        </div>
      </section>
    );
  }
}

export default ChangePasswordConfirmation;