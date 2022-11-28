import React, { Component } from "react";
import UserDataService from "../services/User.service";
import { Link } from "react-router-dom";
export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeSex = this.onChangeSex.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContact = this.onChangeContact.bind(this);
    this.onChangeStudyField = this.onChangeStudyField.bind(this);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
        UserId: null,
        Sex: "",
        Name: "",
        Contact: "",
        StudyField:"",
        Credit:null,
        submitted: false
    };
  }


  onChangeUserId(e) {
    const UserId = e.target.value;

    this.setState({
        UserId: UserId
    });
  }

  onChangeSex(e) {
    const Sex = e.target.value;

    this.setState({
        Sex: Sex
    });
  }

  onChangeName(e) {
    const Name = e.target.value;
    this.setState({
        Name: Name
    });
  }

  onChangeContact(e) {
    const Contact = e.target.value;

    this.setState({
        Contact: Contact
    });
  }

  onChangeStudyField(e) {
    const StudyField = e.target.value;
    this.setState({
        StudyField: StudyField
    });
  }

  onChangeCredit(e) {
    const Credit = e.target.value;
    this.setState({
        Credit: Credit
    });
  }


  saveItem() {
    var data = {
      UserId: this.state.UserId,
      Sex: this.state.Sex,
      Name: this.state.Name,
      Contact: this.state.Contact,
      StudyField:this.state.StudyField,
      Credit:this.state.Credit
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
            UserId: response.data.UserId,
            Sex: response.data.Sex,
            Name: response.data.Name,
            Contact: response.data.Contact,
            StudyField: response.data.StudyField,
            Credit: response.data.Credit,
            submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newItem() {
    this.setState({
        UserId: null,
        Sex: "",
        Name: "",
        Contact: "",
        StudyField:"",
        Credit:null,
        submitted: false
    });
  }
  render() {
    const currentItem = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newItem}>
              Add Another  
            </button>
            <br/><br/>
            <h2>
            <Link
                to={"/User"}
                className="badge badge-secondary"
              >
                Back
              </Link>
            </h2>
          </div>
        ) : (
        
          <div>
            <p>testingme</p>
                <div className="form-group">
                <label>UserId</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.UserId}
                  onChange={this.onChangeUserId}
                />
              </div>
              <div className="form-group">
                <label>Sex</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Sex}
                  onChange={this.onChangeSex}
                />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Contact}
                  onChange={this.onChangeContact}
                />
              </div>
              <div className="form-group">
                <label>StudyField</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.StudyField}
                  onChange={this.onChangeStudyField}
                />
              </div>
              <div className="form-group">
                <label>Credit</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Credit}
                  onChange={this.onChangeCredit}
                />
              </div>

            <button onClick={this.saveItem} className="btn btn-success">
              Submit
            </button>
          </div>
          
        )}
      </div>
    );
  }
    // render(){
    //     return(
    //         <div>
    //             <p>testing</p>
    //         </div>
    //     );
    // }
}
