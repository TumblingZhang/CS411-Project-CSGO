import React, { Component } from "react";
//import {useNavigate} from 'react-router-dom';
import Champion from '../imgs/C.jpg';
import { Link } from "react-router-dom";
export default function Home() {
    var authid = sessionStorage.getItem("UserId");
    //var authed = typeof authid === 'undefined';
    console.log('authid:',authid);
    //console.log('authed:',authed);
    //const navigate = useNavigate();

        return (
            <div className="list row">
            {(authid > 0) ? (

            <div>
            <h4>Welcome! Join Us and Contribute to Your Major!
            </h4>
            <h2>
            <div className="list row">
            <div className="col-md-4">
            <Link
            to={"/Richest"}
            className="badge badge-primary"
          >
            Richest Major
          </Link>
          </div>
          <div className="col-md-8">
          <img src={Champion} alt="csgo champion"></img>
            
          </div>
          <div className="col-md-3">
          <Link
            to={"/Well-Play/"}
            className="badge badge-primary"
          >
            Well-Play Major
          </Link>
          </div>
          </div>
          </h2>
        </div>

            ):(


                <div className="col-md-12">
                <h1>
                <Link
                to={"/auth"}
                className="badge badge-danger"
              >
                Please Login 
              </Link>
              </h1>
              </div>
            )
            }
            </div>
            );
}