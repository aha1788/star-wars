import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing characters' photos.
import img1 from "../img/1.jpg";
import img2 from "../img/2.jpg";
import img3 from "../img/3.jpg";
import img4 from "../img/4.jpg";
import img10 from "../img/10.jpg";
import img14 from "../img/14.jpg";
import img20 from "../img/20.jpg";
import img22 from "../img/22.jpg";

// A hardcoded list of characters names tied to their Star-Wars api ids)
let SW_characters = [
  { id: 1, name: "Luke Skywalker", img: img1 },
  { id: 2, name: "C-3PO", img: img2 },
  { id: 3, name: "R2-D2", img: img3 },
  { id: 4, name: "Darth Vader", img: img4 },
  { id: 10, name: "Obi-Wan Kenobi", img: img10 },
  { id: 14, name: "Han Solo", img: img14 },
  { id: 20, name: "Yoda", img: img20 },
  { id: 22, name: "Boba Fett", img: img22 },
];

/* This component is rendering a list of Star-Wars characters, 
and allow the user to select one of them by reterning its id to the root component (APP) */

export default class SWCList extends Component {
  render() {
    return (
      <div className="swc-list">
        {SW_characters.map((c) => {
          return (
            <div
              className="swc_container"
              onClick={this.props.myClick.bind(this, c.id)}
              key={c.id}
            >
              <img src={c.img} alt={c.name} className="swc-img"></img>
              <Link to="/info" className="show-btn">
                Show me
              </Link>
              <h3>{c.name}</h3>
              <h4>{"Id: " + c.id}</h4>
            </div>
          );
        })}
      </div>
    );
  }
}
