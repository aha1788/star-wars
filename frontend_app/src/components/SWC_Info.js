import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SWC_Info extends Component {
  constructor() {
    super();
    this.state = { name: "", height: 0 };
  }

  componentDidMount() {
    fetch(`https://swapi.dev/api/people/${this.props.id}/`)
      .then((res) => res.json())
      .then((res) => {
        this.setState(res);
      });
  }

  // componentWillReceiveProps(newProps) {
  //   fetch(`https://swapi.dev/api/people/${newProps.id}/`)
  //     .then((res) => res.json())
  //     .then((res) => this.setState(res));
  // }

  render() {
    // console.log(this.state);
    return (
      <div className="">
        <div className="info-plate">
          {" "}
          <h2>Star Wars Character Information </h2>
          <h3 className="c-name"> {"Name: " + this.state.name}</h3>
          <ul>
            <li>{"Height: " + this.state.height}</li>
            <li>{"Mass: " + this.state.mass}</li>
            <li>{"Hair_color: " + this.hair_color}</li>
            <li>{"Skin_color: " + this.state.skin_color}</li>
            <li>{"Gender: " + this.state.gender}</li>
            <li>{"Birth_year: " + this.state.birth_year}</li>
            <li>
              {"Home planet "}
              <ul>
                <li>{this.state.homeworld}</li>
              </ul>
            </li>
            <li>
              {"Species "}
              <ul>
                <li>{this.state.species}</li>
              </ul>
            </li>
            <li>
              {"Films "}
              <ul>
                <li>{this.state.films}</li>
              </ul>
            </li>
          </ul>
          {/* <Link to="/" className="back-btn">
          <div>
            <button>Back to Characters List</button>
          </div>
         < /Link> */}
          <Link to="/" className="show-btn">
            Back to List
          </Link>
        </div>
      </div>
    );
  }
}
