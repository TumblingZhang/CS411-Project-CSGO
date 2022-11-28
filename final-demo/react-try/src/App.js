import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Auth from "./components/Auth"
import AddTutorial from "./components/tutorial-add.component";
import AddUser from "./components/User-add.component";
import AddTeams from "./components/Teams-add.component";
import AddOwn from "./components/Own-add.component";
import Tutorial from "./components/tutorial.component";
import User from "./components/User.component";
import Teams from "./components/Teams.component";
import Profile from "./components/Profile.component";
import ProfileBorrowedList from "./components/ProfileBorrowedList.component";
import ProfileLentList from "./components/ProfileLentList.component";
import ProfileMarketList from "./components/ProfileMarketList.component";
import TutorialsList from "./components/tutorials-list.component";
import UserList from "./components/User-list.component";
import TeamsList from "./components/Teams-list.component";
import SkinList from "./components/Skin-list.component";

//用于返回某个的SkinId的所有Owner
import OwnerList from "./components/OwnerList.component";

import Home from "./components/home";

import RichestList from "./components/RichestList.component";
import WellPlayList from "./components/WellPlayList.component";

//sessionStorage.setItem("UserId",null);
class App extends Component {
  state = {
   authid: sessionStorage.getItem("UserId"), // Yes or no
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            FUN UIUC CSGO
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to={"/Profile/" + this.state.authid} className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/TeamsList/" + this.state.authid} className="nav-link">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/SkinMarket/" + this.state.authid} className="nav-link">
                Skin Market
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to={"/Richest"} className="nav-link">
                Richest
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Well-Play"} className="nav-link">
                Well-Play
              </Link>
            </li> */}
                        <li className="nav-item">
<p>&emsp; &emsp; &emsp;&emsp; &emsp; &emsp;&emsp; &emsp; &emsp;&emsp; &emsp;&emsp; &emsp; &emsp;&emsp; &emsp; &emsp;&emsp; &emsp; &emsp;</p>
            </li>
                        <li className="nav-item">
              <Link to={"/auth"} className="nav-link">
                Login To Another
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/auth" element={<Auth/>} />

            <Route path="/tutorials/add" element={<AddTutorial/>} />
            <Route path="/User/add" element={<AddUser/>} />
            <Route path="/Teams/add" element={<AddTeams/>} />
            <Route path="/Own/add/:UserId/:SkinId" element={<AddOwn/>} />


            <Route path="/tutorials/:id" element={<Tutorial/>} />
            <Route path="/User/:id" element={<User/>} />
            <Route path="/Teams/:id" element={<Teams/>} />
            <Route path="/Owner/:UserId/:SkinId" element={<OwnerList/>} />
            <Route path="/Profile/:id" element={<Profile/>} />
            <Route path="/Profile/Borrowed/:id" element={<ProfileBorrowedList/>} />
            <Route path="/Profile/Lent/:id" element={<ProfileLentList/>} />
            <Route path="/Profile/Market/:id" element={<ProfileMarketList/>} />
          
            <Route path="/tutorials" element={<TutorialsList/>} />
            <Route path="/User" element={<UserList/>} />
            <Route path="/TeamsList/:id" element={<TeamsList/>} />
            <Route path="/SkinMarket/:id" element={<SkinList/>} />

            <Route path="/Richest" element={<RichestList/>} />
            <Route path="/Well-Play" element={<WellPlayList/>} />

          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
