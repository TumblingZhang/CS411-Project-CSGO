import React, { Component } from "react";
import TeamsDataService from "../services/Teams.service";
import { Link } from "react-router-dom";
import { withRouter } from "../common/with-router";

class TeamsList extends Component {
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
  joinTeam(TeamId, UserId){
    TeamsDataService.joinTeam(TeamId,UserId);
    this.forceUpdate();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieve() {
    TeamsDataService.getAll()
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

    TeamsDataService.findByTitle(this.state.searchTitle)
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
        {/* <div className="col-md-8">
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
          <h4>Teams List</h4>

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
                  Team {item.TeamId}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Teams</h4>
              <div>
                <label>
                  <strong>TeamId:</strong>
                </label>{" "}
                {currentItem.TeamId}
              </div>
              <div>
                <label>
                  <strong>Average Credit:</strong>
                </label>{" "}
                {currentItem.avg_Credit}
              </div>
              <div>
                <label>
                  <strong>FoundTime:</strong>
                </label>{" "}
                {currentItem.FoundTime}
              </div>
              <div>
                <label>
                  <strong>FounderId:</strong>
                </label>{" "}
                {currentItem.FounderId}
              </div>
              <div>
                <label>
                  <strong>NumMember:</strong>
                </label>{" "}
                {currentItem.NumMember}
              </div>
              <div>
                <label>
                  <strong>LanguageId:</strong>
                </label>{" "}
                {currentItem.LanguageId}
              </div>
              <div>
                <label>
                  <strong>Lowest_Rank:</strong>
                </label>{" "}
                {currentItem.Lowest_Rank}
              </div>
              <div>
                <label>
                  <strong>Highest_Rank:</strong>
                </label>{" "}
                {currentItem.Highest_Rank}
              </div>
              <h4>
              {/* <Link
                to={"/Teams/" + currentItem.TeamId}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
            <button onClick= {()=>{this.joinTeam(currentItem.TeamId, this.props.router.params.id)}} className="btn btn-success">
              Join This Team
            </button>
              </h4>
              <h4>
            {/* <Link
                to={"/Teams/add"}
                className="badge badge-success"
              >
                Add Another
              </Link> */}
            </h4>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an item to Edit, or:</p>
              <h3>
            {/* <Link
                to={"/Teams/add"}
                className="badge badge-success"
              >
                Add Another
              </Link> */}
            </h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(TeamsList);