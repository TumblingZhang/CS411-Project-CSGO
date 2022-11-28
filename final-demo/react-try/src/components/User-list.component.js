import React, { Component } from "react";
import UserDataService from "../services/User.service";
import { Link } from "react-router-dom";

export default class UserList extends Component {
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
    this.retrieve();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieve() {
    UserDataService.getAll()
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

    UserDataService.findByTitle(this.state.searchTitle)
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
          <h4>Items List</h4>

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
                  {item.Name}
                </li>
              ))}
              
          </ul>


        </div>
        <div className="col-md-3">
          {currentItem ? (
            <div>
              <h4>User</h4>
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
              <div>
                <label>
                  <strong>Credit:</strong>
                </label>{" "}
                {currentItem.Credit}
              </div>
              <h4>
              <Link
                to={"/User/" + currentItem.UserId}
                className="badge badge-warning"
              >
                Edit
              </Link>
              </h4>
              <h4>
            <Link
                to={"/User/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h4>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an item to Edit, or:</p>
              <h3>
            <Link
                to={"/User/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
