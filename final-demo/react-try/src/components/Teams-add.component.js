import React, { Component } from "react";
import TeamsDataService from "../services/Teams.service";
import { Link } from "react-router-dom";
export default class AddTeams extends Component {
  constructor(props) {
    super(props);
    this.onChangeTeamId = this.onChangeTeamId.bind(this);
    this.onChangeFoundTime = this.onChangeFoundTime.bind(this);
    this.onChangeFounderId = this.onChangeFounderId.bind(this);
    this.onChangeNumMember = this.onChangeNumMember.bind(this);
    this.onChangeLanguageId = this.onChangeLanguageId.bind(this);
    this.onChangeLowest_Rank = this.onChangeLowest_Rank.bind(this);
    this.onChangeHighest_Rank = this.onChangeHighest_Rank.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
        TeamId: null,
        FoundTime: "",
        FounderId: "",
        NumMember: null,
        LanguageId:null,
        Lowest_Rank:null,
        Highest_Rank:null,
        submitted: false
    };
  }


  onChangeTeamId(e) {
    const TeamId = e.target.value;

    this.setState({
        TeamId: TeamId
    });
  }

  onChangeFoundTime(e) {
    const FoundTime = e.target.value;

    this.setState({
        FoundTime: FoundTime
    });
  }

  onChangeFounderId(e) {
    const FounderId = e.target.value;
    this.setState({
        FounderId: FounderId
    });
  }

  onChangeNumMember(e) {
    const NumMember = e.target.value;

    this.setState({
        NumMember: NumMember
    });
  }

  onChangeLanguageId(e) {
    const LanguageId = e.target.value;
    this.setState({
        LanguageId: LanguageId
    });
  }

  onChangeLowest_Rank(e) {
    const Lowest_Rank = e.target.value;
    this.setState({
        Lowest_Rank: Lowest_Rank
    });
  }

  onChangeHighest_Rank(e) {
    const Highest_Rank = e.target.value;
    this.setState({
        Highest_Rank: Highest_Rank
    });
  }

  saveItem() {
    var data = {
      TeamId: this.state.TeamId,
      FoundTime: this.state.FoundTime,
      FounderId: this.state.FounderId,
      NumMember: this.state.NumMember,
      LanguageId:this.state.LanguageId,
      Lowest_Rank:this.state.Lowest_Rank,
      Highest_Rank:this.state.Highest_Rank
    };

    TeamsDataService.create(data)
      .then(response => {
        this.setState({
            TeamId: response.data.TeamId,
            FoundTime: response.data.FoundTime,
            FounderId: response.data.FounderId,
            NumMember: response.data.NumMember,
            LanguageId: response.data.LanguageId,
            Lowest_Rank: response.data.Lowest_Rank,
            Highest_Rank: response.data.Highest_Rank,
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
        TeamId: null,
        FoundTime: "",
        FounderId: "",
        NumMember: null,
        LanguageId:null,
        Lowest_Rank:null,
        Highest_Rank:null,
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
                to={"/Teams"}
                className="badge badge-secondary"
              >
                Back
              </Link>
            </h2>
          </div>
        ) : (
        
          <div>
                <div className="form-group">
                <label>TeamId</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.TeamId}
                  onChange={this.onChangeTeamId}
                />
              </div>
              <div className="form-group">
                <label>FoundTime</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.FoundTime}
                  onChange={this.onChangeFoundTime}
                />
              </div>
              <div className="form-group">
                <label>FounderId</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.FounderId}
                  onChange={this.onChangeFounderId}
                />
              </div>
              <div className="form-group">
                <label>NumMember</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.NumMember}
                  onChange={this.onChangeNumMember}
                />
              </div>
              <div className="form-group">
                <label>LanguageId</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.LanguageId}
                  onChange={this.onChangeLanguageId}
                />
              </div>
              <div className="form-group">
                <label>Lowest_Rank</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Lowest_Rank}
                  onChange={this.onChangeLowest_Rank}
                />
              </div>
              <div className="form-group">
                <label>Highest_Rank</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={currentItem.Highest_Rank}
                  onChange={this.onChangeHighest_Rank}
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
