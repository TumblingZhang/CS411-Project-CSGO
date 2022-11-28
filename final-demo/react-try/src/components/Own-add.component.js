import React, { Component } from "react";
import OwnDataService from "../services/Own.service";
import SkinDataService from "../services/Skin.service";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";
class AddOwn extends Component {
  constructor(props) {
    super(props);

    this.onChangeDue = this.onChangeDue.bind(this);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.newItem = this.newItem.bind(this);

    this.state = {
        UserId: this.props.router.params.UserId,
        Credit: 4,
        Due: 7,
        submitted: false,
        skin: {
            WeaponType: "",
            SkinName: "",
            SkinId: null,
            Credit_Suggest: null
          }
    };
  }
  componentDidMount() {
    this.getSkin(this.props.router.params.SkinId);
    this.setState({
        Credit: this.state.skin.Credit_Suggest
    });
  }
  getSkin(id) {
    SkinDataService.get(id)
    .then(response => {
        this.setState({
            skin: response.data,
        });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    
}


  onChangeDue(e) {
    const Due = e.target.value;

    this.setState({
        Due: Due
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
      SkinId: this.state.skin.SkinId,
      Due: this.state.Due,
      StartDate: null,
      LendStatus: 1,
      Credit:this.state.Credit,
      BorrowerId:null
    };

    OwnDataService.create(data)
      .then(response => {
        this.setState({
            Due: response.data.Due,
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
        OwnId: null,
        Due: "",
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
        <><div className="col-md-6">
            <h4>
                <br></br>
                SkinName: {currentItem.skin.SkinName}
                <br></br>
                WeaponType: {currentItem.skin.WeaponType}
            </h4>
        </div>
        <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Successfully put on the shelves!</h4>
                        {/* <button className="btn btn-success" onClick={this.newItem}>
                            Add Another
                        </button> */}
                        <br /><br />
                        <h2>
                            <Link
                                to={"/SkinMarket/"+ currentItem.UserId}
                                className="badge badge-secondary"
                            >
                                Back
                            </Link>
                        </h2>
                    </div>
                ) : (

                    <div>
                        {/* <p>testingme</p> */}

                        <div className="form-group">
                            <label>Lend Due</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={currentItem.Due}
                                onChange={this.onChangeDue} />
                        </div>

                        <div className="form-group">
                            <label>Credit Should Pledge</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={currentItem.Credit}
                                onChange={this.onChangeCredit} />
                        </div>

                        <button onClick={this.saveItem} className="btn btn-success">
                            Submit
                        </button>
                    </div>

                )}
            </div></>
      
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

export default withRouter(AddOwn);