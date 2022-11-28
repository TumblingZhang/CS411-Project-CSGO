import React, { Component } from "react";
import TeamsDataService from "../services/Teams.service";
import { withRouter } from '../common/with-router';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.onChangeFounderId = this.onChangeFounderId.bind(this);
    this.onChangeFoundTime = this.onChangeFoundTime.bind(this);
    this.onChangeNumMember = this.onChangeNumMember.bind(this);
    this.onChangeLanguageId = this.onChangeLanguageId.bind(this);
    this.onChangeLowest_Rank = this.onChangeLowest_Rank.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.updateTeams = this.updateTeams.bind(this);
    this.deleteTeams = this.deleteTeams.bind(this);

    this.state = {
      currentItem: {
        TeamId: null,
        FoundTime: "",
        NumMember: "",
        LanguageId:"",
        Lowest_Rank:null,
        Highest_Rank:null,
      },
      message: ""
    };
  }
// 这里的id是router的参数（URL上的那个id）
  componentDidMount() {
    this.getTeams(this.props.router.params.id);
  }

  onChangeFoundTime(e) {
    const FoundTime = e.target.value;

    this.setState(function(prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          FoundTime: FoundTime
        }
      };
    });
  }

  onChangeFounderId(e) {
    const FounderId = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        FounderId: FounderId
      }
    }));
  }

  onChangeNumMember(e) {
    const NumMember = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        NumMember: NumMember
      }
    }));
  }

  onChangeLanguageId(e) {
    const LanguageId = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        LanguageId: LanguageId
      }
    }));
  }

  onChangeLowest_Rank(e) {
    const Lowest_Rank = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        Lowest_Rank: Lowest_Rank
      }
    }));
  }

  onChangeHighest_Rank(e) {
    const Highest_Rank = e.target.value;

    
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        Highest_Rank: Highest_Rank
      }
    }));
  }

  getTeams(TeamId) {
    TeamsDataService.get(TeamId)
      .then(response => {
        this.setState({
          currentItem: response.data
        });
        this.setState(prevState => ({
            currentItem: {
              ...prevState.currentItem,
              FoundTime: prevState.currentItem.FoundTime.substring(0,10)
            }
          }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTeams() {
    TeamsDataService.update(
        this.state.currentItem.TeamId,
        this.state.currentItem
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Teams was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTeams() {    
    TeamsDataService.delete(this.state.currentItem.TeamId)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Teams');
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
            <h4>Teams</h4>
            <form>
              <div className="form-group">
                <label>FoundTime</label>
                <input
                  type="text"
                  className="form-control"
                  id="FoundTime"
                  value={currentItem.FoundTime}
                  onChange={this.onChangeFoundTime}
                />
              </div>
              <div className="form-group">
                <label>FounderId</label>
                <input
                  type="text"
                  className="form-control"
                  id="FounderId"
                  value={currentItem.FounderId}
                  onChange={this.onChangeFounderId}
                />
              </div>
              <div className="form-group">
                <label>NumMember</label>
                <input
                  type="text"
                  className="form-control"
                  id="NumMember"
                  value={currentItem.NumMember}
                  onChange={this.onChangeNumMember}
                />
              </div>
              <div className="form-group">
                <label>LanguageId</label>
                <input
                  type="text"
                  className="form-control"
                  id="LanguageId"
                  value={currentItem.LanguageId}
                  onChange={this.onChangeLanguageId}
                />
              </div>
              <div className="form-group">
                <label>Lowest_Rank</label>
                <input
                  type="text"
                  className="form-control"
                  id="Lowest_Rank"
                  value={currentItem.Lowest_Rank}
                  onChange={this.onChangeLowest_Rank}
                />
              </div>
              <div className="form-group">
                <label>Highest_Rank</label>
                <input
                  type="text"
                  className="form-control"
                  id="Highest_Rank"
                  value={currentItem.Highest_Rank}
                  onChange={this.onChangeHighest_Rank}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTeams}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTeams}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Teams...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Teams);