import React, { Component } from "react";
import UserDataService from "../services/User.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";
class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeStudyField = this.onChangeStudyField.bind(this);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentItem: {
        UserId: null,
        Sex: "",
        Name: "",
        Contact: "",
        StudyField:"",
        Credit:0
      },
      message: ""
    };
  }
// 这里的id是router的参数（URL上的那个id）
  componentDidMount() {
    this.getUser(this.props.router.params.id);
  }

  onChangeSex(e) {
    const Sex = e.target.value;

    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          Sex: Sex
        }
      };
    });
  }

 
  onChangeName(e) {
    const Name = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        Name: Name
      }
    }));
  }

  onChangeContact(e) {
    const Contact = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        Contact: Contact
      }
    }));
  }

  onChangeStudyField(e) {
    const StudyField = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        StudyField: StudyField
      }
    }));
  }

  onChangeCredit(e) {
    const Credit = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        Credit: Credit
      }
    }));
  }

  getUser(UserId) {
    UserDataService.get(UserId)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    UserDataService.update(
        this.state.currentItem.UserId,
        this.state.currentItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    UserDataService.delete(this.state.currentItem.UserId)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/User');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentItem } = this.state;

    return (
      <div>
        {currentItem ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label>Sex</label>
                <input
                  type="text"
                  className="form-control"
                  id="Sex"
                  value={currentItem.Sex}
                  onChange={this.onChangeSex}
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={currentItem.Name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  className="form-control"
                  id="Contact"
                  value={currentItem.Contact}
                  onChange={this.onChangeContact}
                />
              </div>
              <div className="form-group">
                <label>StudyField</label>
                <input
                  type="text"
                  className="form-control"
                  id="StudyField"
                  value={currentItem.StudyField}
                  onChange={this.onChangeStudyField}
                />
              </div>
              {/* <div className="form-group">
                <label>Credit</label>
                <input
                  type="text"
                  className="form-control"
                  id="Credit"
                  value={currentItem.Credit}
                  onChange={this.onChangeCredit}
                />
              </div> */}
            </form>

            {/* <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button> */}
            <h3>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            </h3>
            <h2>
            <Link
                to={"/Profile/" + currentItem.UserId}
                className="badge badge-secondary"
              >
                Back
              </Link>
              </h2>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(User);