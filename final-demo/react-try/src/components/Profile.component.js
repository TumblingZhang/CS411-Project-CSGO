import React, { Component } from "react";
import ProfileDataService from "../services/Profile.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.state = {
            currentUser: {
                UserId: null,
                Sex: "",
                Name: "",
                Contact: "",
                StudyField:"",
                Credit:0
              }
        };
    }
    componentDidMount() {
        this.getUser(this.props.router.params.id);
    }

    getUser(UserId) {
    ProfileDataService.getUser(UserId)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
render() {
    const { currentUser} = this.state;

    return (
<div className="list row">
        <div className="col-md-8">
        
              <h1>My Profile</h1>
              <h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentUser.Name}
              </div>
              <div>
                <label>
                  <strong>Sex:</strong>
                </label>{" "}
                {currentUser.Sex}
              </div>
              <div>
                <label>
                  <strong>Contact:</strong>
                </label>{" "}
                {currentUser.Contact}
              </div>
              <div>
                <label>
                  <strong>StudyField:</strong>
                </label>{" "}
                {currentUser.StudyField}
              </div>
              <div>
                <label>
                  <strong>Credit:</strong>
                </label>{" "}
                {currentUser.Credit}
              </div>
              <h4>
              <Link
                to={"/User/" + currentUser.UserId}
                className="badge badge-warning"
              >
                Edit
              </Link>
              </h4>
              </h4>
        </div>
        <div className="col-md-3">
              <h3>
              <br></br>
              <Link
                to={"/Profile/Market/" + currentUser.UserId}
                className="badge badge-primary"
              >
                Check My Skins On Market
              </Link>
              <br></br>
              <br></br>
              <Link
                to={"/Profile/Borrowed/" + currentUser.UserId}
                className="badge badge-secondary"
              >
                Check My Borrowed Skins
              </Link>
              <br></br>
              <br></br>
              <Link
                to={"/Profile/Lent/" + currentUser.UserId}
                className="badge badge-info"
              >
                Check My Lent Skins
              </Link>
              </h3>
        </div>
    </div>
    );
  }
}

export default withRouter(Profile);