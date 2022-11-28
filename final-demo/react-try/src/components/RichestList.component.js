import React, { Component } from "react";
import TutorialDataService from "../services/Richest Major.service";
import { Link } from "react-router-dom";

import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';
var datapack1 = [];

export default class RichestMojorList extends Component {
    constructor(props) {
      super(props);
      // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
      // this.retrieve = this.retrieve.bind(this);
      // this.refreshList = this.refreshList.bind(this);
      this.setActive = this.setActive.bind(this);
      // this.searchTitle = this.searchTitle.bind(this);
      this.query1 = this.query1.bind(this);
      this.query2 = this.query2.bind(this);
    //   this.query2 = this.fetchdata.bind(this);

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
      //console.log(datapack1);
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

    // fetchdata() {
    //     patch(`/User/query1`)
    //     .then(response => {
    //       this.setState({
    //         items: response.data
    //       });
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    //   }
  
    setActive(tutorial, index) {
      this.setState({
        currentItem: tutorial,
        currentIndex: index
      });
    }

    
    render() {
      const { searchTitle, items, currentItem, currentIndex } = this.state;
  
      return (
        <>
            <h1 className="text-heading">
                Richest Major
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={datapack1} margin={{ right: 10 }}>
                    <CartesianGrid />
                    <XAxis dataKey="StudyField" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="avgS"
                        stroke="black" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            <h2>
            <Link
                to={"/"}
                className="badge badge-secondary"
              >
                Back
              </Link>
              </h2>
        </>
        
    );
    }
  }