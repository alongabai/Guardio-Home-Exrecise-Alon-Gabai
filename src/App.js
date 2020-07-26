import React, {Component} from 'react';
import './App.css';
import Item from "./Item.js"

class App extends Component{
  constructor(){
    super()
    this.state={

    }
    this.toggleTheme = this.toggleTheme.bind(this)
  }

  componentWillMount(){
    //setup all the breaches
    const url = "https://guard.io/v2/hiring/fe/breaches?offset=0";
    fetch(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Best-Pokemon": "charizard",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        const obj = data.items
        var items= obj.map((item, index) => <Item key={index} item={item} index={index} />)
        //sort by breach date DESC
        items.sort(function(a, b) {
            var dateA = new Date(a.props.item.BreachDate), dateB = new Date(b.props.item.BreachDate);
            return dateB-dateA;
        });
        //save breaches in state
        this.setState({
          breaches: items
        })
      })
      //catching errors
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount(){
    // When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.padding = "30px 10px";
        document.getElementsByClassName("logo")[0].style.fontSize = "25px";
      } else {
        document.getElementById("navbar").style.padding = "80px 10px";
        document.getElementsByClassName("logo")[0].style.fontSize = "35px";
      }
    }

  }

  componentDidUpdate(){
    // check save theme mode
    var startState = localStorage.getItem("theme")
    if (startState === null || startState === undefined){
      localStorage.setItem("theme", "light")
    }
    else if (startState === "dark") {
      this.toggleTheme()
    }

    document.getElementById("navbar-right").addEventListener("click", () => this.toggleTheme())
  }

  toggleTheme(){
    //change theme save in localStorage
    document.getElementById("navbar").classList.toggle("dark-mode")
    document.getElementsByClassName("App")[0].classList.toggle("dark-mode")
    Array.prototype.forEach.call(document.getElementsByClassName("accordion"),item => item.classList.toggle("dark-mode"))
    var currentState = localStorage.getItem("theme")
    if (currentState === "light"){
      currentState = "dark";
    }
    else{
      currentState = "light";
    }
    localStorage.setItem("theme", currentState)
  }

  render(){
    console.log("render")
    return(
      <div className="App">
        <div id="navbar">
          <a href="#default" className="logo"><i className="fas fa-exclamation-triangle"></i> Data Breaches</a>
          <div id="navbar-right">
            <i className="fas fa-adjust logo"></i>
          </div>
        </div>
        <div id="itemList">
        {this.state.breaches}
        </div>
      </div>
    )
  }
}

export default App;
