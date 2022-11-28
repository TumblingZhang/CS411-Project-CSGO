//用于返回某个的SkinId的所有Owner
import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import OwnerDataService from "../services/Own.service";
import SkinDataService from "../services/Skin.service";
import UserDataService from "../services/User.service";
import { withRouter } from '../common/with-router';
class OwnerList extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    // this.retrieve = this.retrieve.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);
    this.borrow = this.borrow.bind(this);

    this.state = {
      User:{
        UserId:null,
        Name: "",
        Credit:null
      },
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: "",
      skin: {
        WeaponType: "",
        SkinName: "",
        SkinId: null
      }
    };
  }
  componentDidMount() {
    this.getOwners(this.props.router.params.SkinId);
    this.getSkin(this.props.router.params.SkinId);
    this.getUser(this.props.router.params.UserId)
  }

  getOwners(id) {
    //实际上是get了Owner natural join User where LendStatus = 1
    OwnerDataService.getOwnerNames(id)
    .then(response => {
      this.setState({
        items: response.data
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  getSkin(id) {
    SkinDataService.get(id)
    .then(response => {
        this.setState({
            skin: response.data
        });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

getUser(id) {
  UserDataService.get(id)
  .then(response => {
    this.setState({
      User: response.data
    });
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
}

borrow(LenderId, SkinId, BorrowerId, CreditPledge){
  OwnerDataService.borrowSkin(LenderId, SkinId, BorrowerId);
  console.log("CreditPledge:",CreditPledge);
  console.log("UserCredit:",this.state.User.Credit)
  var CreditNow = this.state.User.Credit - CreditPledge ;
  console.log("CreditNow:",CreditNow);
  UserDataService.borrowSkin(BorrowerId, CreditNow);
  alert('Successfully borrowed!');
}

  setActive(tutorial, index) {
    this.setState({
      currentItem: tutorial,
      currentIndex: index
    });
  }

  render() {
    const { User, items, currentItem, currentIndex, skin} = this.state;

    return (

        <div className="list row">
        <div className="col-md-3">
            <h4>
              Hi {User.Name}!
            <br></br>
            <br></br>
            Currently You Have:
            <br></br>
            {User.Credit} credit
            </h4>
        </div>

        <div className="col-md-4">
        <h4>Owners of {this.state.skin.WeaponType}: {this.state.skin.SkinName}</h4>
          <ul className="list-group">
            {items &&
              items.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(tutorial, index)}
                  key={index}
                >
                  {tutorial.Name}
                </li>
              ))}
          </ul>
        
            <div className="submit-form">
            </div>
        </div>
        <div className="col-md-5">
          {currentItem ? (
            <div>
              <h4>Lend Restriction Info</h4>
              <div>
                <label>
                  <strong>Credit You Should Pledge:</strong>
                </label>{" "}
                {currentItem.Credit}
              </div>
              <div>
                <label>
                  <strong>Maximum Borrow Time:</strong>
                </label>{" "}
                {currentItem.Due} days
              </div>
              <br></br>
              <h4>Owner Info</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentItem.Name}
              </div>
              <div>
                <label>
                  <strong>Sex:</strong>
                </label>{" "}
                {currentItem.Sex}
              </div>
              <div>
                <label>
                  <strong>Contact:</strong>
                </label>{" "}
                {currentItem.Contact}
              </div>
              <div>
                <label>
                  <strong>StudyField:</strong>
                </label>{" "}
                {currentItem.StudyField}
              </div>

              <h4>

              </h4>
              <h4>
              <button onClick= {()=>this.borrow(currentItem.UserId, skin.SkinId, User.UserId, currentItem.Credit)} className="btn btn-success">
              Confirm to Borrow From Him/Her
            </button>
            <Link
                to={"/SkinMarket/"+User.UserId}
                className="badge badge-secondary"
              >
                Back to Market
              </Link>
            </h4>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Owner to Borrow</p>
              <br></br>
              <p>Or:</p>
              <h3>
            <Link
                to={"/SkinMarket/"+User.UserId}
                className="badge badge-secondary"
              >
                Back to Market
              </Link>
            </h3>
            </div>
          )}
        </div>



      </div>
    );
  }
}
export default withRouter(OwnerList);