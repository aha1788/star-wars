import React, { Component } from "react";
import { Link } from "react-router-dom";

/* This component is fetching character's information form the backend-api 
depending on the selected id passed by props from the main APP component. 
Then once that available, it is rendering that information.  */

export default class SWCInfo extends Component {
  // the constructor function
  constructor() {
    super();
    this.state = {
      isRunning: true,
      data: {},
    };
  }

  // the function is fetching character's information form the backend-api
  //http://localhost:5000/api-people/${this.props.id}/

  componentDidMount() {
    fetch(`http://localhost:5000/api-people/${this.props.id}/`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ data: res.data, isRunning: false });
      });
  }

  render() {
    // console.log(this.state);
    if (this.state.isRunning) {
      return (
        <div className="info-plate">
          <h3>Character Information </h3>
          <div className="pending">
            Please wait while we are fetching the data...
          </div>
          <div className="loader"></div>
        </div>
      );
    } else
      return (
        <div>
          <div className="info-plate">
            <h3>Character Information </h3>
            <h2 className="c-name"> {" " + this.state.data.name}</h2>
            <ul>
              <li className="info-gr">{"Height: " + this.state.data.height}</li>
              <li className="info-gr">{"Mass: " + this.state.data.mass}</li>
              <li className="info-gr">
                {"Hair Color: " + this.state.data.hair_color}
              </li>
              <li className="info-gr">
                {"Skin Color: " + this.state.data.skin_color}
              </li>
              <li className="info-gr">{"Gender: " + this.state.data.gender}</li>
              <li className="info-gr">
                {"Birth Year: " + this.state.data.birth_year}
              </li>
              <li className="info-gr">
                {"Home Planet "}
                <ul>
                  <li>{"Title: " + this.state.data.homeworld.title}</li>
                  <li>{"Terrain: " + this.state.data.homeworld.terrain}</li>
                  <li>
                    {"Population: " + this.state.data.homeworld.population}
                  </li>
                </ul>
              </li>
              <li className="info-gr">
                {"Species: "}
                {this.state.data.species === "n/a" ? (
                  "n/a"
                ) : (
                  <ul>
                    <li>{"Name: " + this.state.data.species.name}</li>
                    <li>
                      {"Average Lifespan: " +
                        this.state.data.species.average_lifespan}
                    </li>
                    <li>
                      {"Classification: " +
                        this.state.data.species.classification}
                    </li>
                    <li>{"Language: " + this.state.data.species.language}</li>
                  </ul>
                )}
              </li>
              <li className="info-gr">
                {"Films: "}

                <ol>
                  {Object.entries(this.state.data.films).map((el) => {
                    return (
                      <div key={el[0]}>
                        <li> </li>
                        <ul>
                          <li>{"Title: " + el[1].title}</li>
                          <li>{"Director: " + el[1].director}</li>
                          <li>{"Producers: " + el[1].producer}</li>
                          <li>{"Release Date: " + el[1].release_date}</li>
                        </ul>
                      </div>
                    );
                  })}
                </ol>
              </li>
            </ul>
            <Link to="/" className="show-btn">
              Back to List
            </Link>
          </div>
        </div>
      );
  }
}
