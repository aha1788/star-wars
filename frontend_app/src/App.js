import "./App.css";
import SWC from "./components/SWC.js";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img10 from "./img/10.jpg";
import img14 from "./img/14.jpg";
import img20 from "./img/20.jpg";
import img22 from "./img/22.jpg";

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
function myClick(id) {
  console.log("hi.. " + id);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>STAR WARS</h2>
      </header>
      <main className="App-main">
        <SWC />
        <div className="main-div">
          {SW_characters.map((c) => {
            return (
              <div
                className="swc_container"
                onClick={myClick.bind(this, c.id)}
                key={c.id}
              >
                <img src={c.img} alt={c.name} className="swc-img"></img>
                <h3>{"Id: " + c.id}</h3>
                <h3>{c.name}</h3>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
