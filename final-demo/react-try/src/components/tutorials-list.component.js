import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
var datapack1 = [];
export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    // this.retrieve = this.retrieve.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    this.setActive = this.setActive.bind(this);
    // this.searchTitle = this.searchTitle.bind(this);
    this.query1 = this.query1.bind(this);
    this.query2 = this.query2.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.query1();
  }

  query1() {
    TutorialDataService.query1()
    .then(response => {
      this.setState({
        items: response.data
      });
      datapack1 = response.data;
      //console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    console.log(datapack1);
  }

  query2() {
    TutorialDataService.query2()
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

  // componentDidMount() {
  //   this.retrieve();
  // }

  // onChangeSearchTitle(e) {
  //   const searchTitle = e.target.value;

  //   this.setState({
  //     searchTitle: searchTitle
  //   });
  // }

  // retrieve() {
  //   TutorialDataService.getAll()
  //     .then(response => {
  //       this.setState({
  //         items: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  // refreshList() {
  //   this.retrieve();
  //   this.setState({
  //     currentItem: null,
  //     currentIndex: -1
  //   });
  // }

  setActive(tutorial, index) {
    this.setState({
      currentItem: tutorial,
      currentIndex: index
    });
  }

  // searchTitle() {
  //   this.setState({
  //     currentItem: null,
  //     currentIndex: -1
  //   });

  //   TutorialDataService.findByTitle(this.state.searchTitle)
  //     .then(response => {
  //       this.setState({
  //         items: response.data
  //       });
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  render() {
    const { searchTitle, items, currentItem, currentIndex } = this.state;

    return (

      <div className="list row">
        <h4>Advanced Query</h4>
      <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.query1}
          >
            Richest Major
          </button>
   
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.query2}
          >
            Well-Play Major
          </button>

{/*           
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
        </div> */}
        <div className="col-md-6">

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
                  {tutorial.StudyField}
                </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">

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
                  {tutorial.avgS}
                </li>
              ))}
          </ul>
        </div>




        {/* <div className="col-md-6"> */}
{/*             
          {currentItem ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentItem.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentItem.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentItem.published ? "Published" : "Pending"}
              </div>
              <h4>
              <Link
                to={"/tutorials/" + currentItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
              </h4>
              <h4>
            <Link
                to={"/tutorials/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h4>
            <br></br>
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Richest Major
              </button>
              <br></br>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Well-Play Major
              </button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an item to Edit, or:</p>
              <h3>
            <Link
                to={"/tutorials/add"}
                className="badge badge-success"
              >
                Add Another
              </Link>
            </h3>
            <br></br>
            <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Richest Major
              </button>
              <br></br>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Well-Play Major
              </button>
            </div>
          )} */}
        {/* </div> */}
      </div>
    );
  }
}
