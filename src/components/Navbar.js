import React, { Component } from 'react';
import { Auth } from 'aws-amplify';


export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="200" height="100" alt="ehealth logo" />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
           { this.props.auth.isAuthenticated && this.props.auth.user && (
                <p size="is-medium" >
                  Hello {this.props.auth.user.username}

                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-outlined">
                    Log out
                  </a>
                )
                }

                {this.props.auth.isAuthenticated && (
                  <a href="/profile" className="button is-primary is-outlined">
                    Profile
                  </a>

                )
                }

              </div>
            </div>
          </div>

        </div>
      </nav>
    )
  }
}
