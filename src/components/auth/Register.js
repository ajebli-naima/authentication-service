import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";


class Register extends Component {
  state = {
    given_name: "",
    family_name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    inpe: "", //Identifiant National des Professionnels de Santé et des Etablissements de Santé
    category: "",
    confirmpassword: "",
    ischecked: false,
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleShow = () => {
    this.setState({
      ischecked: !this.state.ischecked
    })
  }



  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { given_name, family_name, username, email, password, role, inpe, category, ischecked } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        given_name,
        family_name,
        username,
        password,
        role,
        inpe,
        category,
        ischecked,
        attributes: {
          email: email,
          given_name: given_name,
          family_name: family_name,
          profile: role
        }
      });
      if (inpe === "" && category === "") {
        this.setState({
          role: "patient",
          ischecked: false
        })
      } else {
        this.setState({ 
          role: "doctor" ,
        ischecked: true})
      }
      this.props.history.push("/welcome");
      console.log(this.state.role);
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {


    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="given_name"
                  aria-describedby="firstNameHelp"
                  placeholder="Enter First Name"
                  value={this.state.given_name}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="family_name"
                  aria-describedby="lastNameHelp"
                  placeholder="Enter Last Name"
                  value={this.state.family_name}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <label className="checkbox">
              <input type="checkbox"
                id="ischecked"
                name="ischecked"
                ischecked={this.state.ischecked}
                //value={this.state.role}
                onClick={this.handleShow}
                onChange={this.onInputChange}
              />    Check if you are a doctor
                <br />
              {this.state.ischecked ?
                <section className="section auth">
                  <div className="container">
                    <div className="field">
                      <p className="control  has-icons-left " id="inpe" >
                        <input
                          className="input"
                          type="text"
                          id="inpe"
                          placeholder="Enter inpe"
                          value={this.state.inpe}
                          onChange={this.onInputChange}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <p className="control has-icons-left " id="category" >
                        <input
                          className="input"
                          type="text"
                          id="category"
                          placeholder="Enter Category"
                          value={this.state.category}
                          onChange={this.onInputChange}
                        />
                      </p>
                    </div>
                  </div>
                </section>
                :
                null

              }


            </label>



            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;