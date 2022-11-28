import React, { Component } from "react";
import SkinDataService from "../services/Skin.service";
import { Link } from "react-router-dom";
import { withRouter } from "../common/with-router";

class SkinList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchTitle1 = this.onChangeSearchTitle1.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: "",
      searchTitle1:"",
      UserId:this.props.router.params.id
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

  onChangeSearchTitle1(e) {
    const searchTitle1 = e.target.value;

    this.setState({
      searchTitle1: searchTitle1
    });
  }

  retrieve() {
    SkinDataService.getAll()
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

    SkinDataService.findByTitle(this.state.searchTitle)
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
    const { searchTitle, items, currentItem, currentIndex, UserId} = this.state;

    return (
      
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>All Skins</h4>

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
                <br></br>
                <Link
                to={"/Own/add/" + UserId + "/" + currentItem.SkinId}
                className="badge badge-primary"
              >
                I Want to Lend This Skin
              </Link>
              <br></br>
              <br></br>
              <Link
                to={"/Owner/" + UserId +"/"+ currentItem.SkinId}
                className="badge badge-success"
              >
                I Want to Borrow This Skin
              </Link>
              </h4>
              <p>(Click to Check Available Lenders)</p>
              
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
export default withRouter(SkinList);