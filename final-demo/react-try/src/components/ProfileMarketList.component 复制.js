import React, { Component } from "react";
import OwnDataService from "../services/Own.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class ProfileMarketList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieve(this.props.router.params.id);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieve(UserId) {
    OwnDataService.getSkinOnMarket(UserId)
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


  refreshList() {
    this.retrieve();
    this.setState({
      currentItem: null,
      currentIndex: -1
    });
  }

  setActive(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index
    });
  }

  searchTitle() {
    this.setState({
      currentItem: null,
      currentIndex: -1
    });

    OwnDataService.findByTitle(this.state.searchTitle)
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

  render() {
    const { searchTitle, items, currentItem, currentIndex } = this.state;

    return (
        <div className="list row">

        <div className="col-md-6">
          <h4>Your Skins On Market</h4>

          <ul className="list-group">
            {items &&
              items.map((item, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActive(item, index)}
                  key={index}
                >
                  {item.WeaponType}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Skin</h4>
              <div>
                <label>
                  <strong>WeaponType:</strong>
                </label>{" "}
                {currentItem.WeaponType}
              </div>
              <div>
                <label>
                  <strong>MarketPrice:</strong>
                </label>{" "}
                {currentItem.MarketPrice}
              </div>
              <div>
                <label>
                  <strong>Credit_Suggest:</strong>
                </label>{" "}
                {currentItem.Credit_Suggest}
              </div>
              <div>
                <label>
                  <strong>SkinName:</strong>
                </label>{" "}
                {currentItem.SkinName}
              </div>
              <div>
                <h4>
              <Link
                to={"/Owner/" + currentItem.SkinId}
                className="badge badge-success"
              >
                Check Owners
              </Link>
              </h4>
              </div>
              {/* <h4>
              <Link
                to={"/Skin/" + currentItem.SkinId}
                className="badge badge-warning"
              >
                Edit
              </Link>
              </h4> */}
              {/* <h4>
            <Link
                to={"/Skin/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h4> */}
            </div>
          ) : (
            <div>
              {/* <br />
              <p>Please click on an item to Edit, or:</p>
              <h3>
            <Link
                to={"/Skin/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h3> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(ProfileMarketList);