import React, { Component } from "react";
import UserDataService from "../services/User.service";
import { Link } from "react-router-dom";
import { withRouter } from '../common/with-router';
import LoginDataService from "../services/Login.service";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
    currentUser:{
      Email: "",
      Password: "",
      UserId: null
    },
    Email: ""
    };
  }
componentDidMount(){
  sessionStorage.clear();
}

  onChangeEmail(e) {
    const Email = e.target.value;

    this.setState({
      Email: Email
    });
  }

  navigateTo(){
    console.log("User Logged In:",sessionStorage.getItem("UserId"));
    this.props.router.navigate('/');
}
  searchEmail() {

    LoginDataService.findByTitle(this.state.Email)
      .then(response => {
        this.setState({
            currentItem: response.data[0]
        });
        console.log(response.data[0].UserId);
        sessionStorage.setItem("UserId",response.data[0].UserId);
      })
      .catch(e => {
        console.log(e);
      });
      this.navigateTo();
  }

  render() {
    const { Email, currentUser } = this.state;

    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary">
              <a href="#">Sign Up</a>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={Email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={()=>this.searchEmail()}>
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
            <a href="#"> Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Auth);