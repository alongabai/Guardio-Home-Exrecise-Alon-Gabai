import React from "react"
import './App.css';
import ReactHtmlParser from 'react-html-parser';

function setUp(event){
  //open further description
  event.target.classList.toggle("active");
  var panel = event.target.nextElementSibling;
  if(panel!==null){
    if (panel.className === "panel" ) {
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    }    
  }

  saveHandle(event)
}

function saveHandle(event){
  //save last open
  const saveLastOpenChildrens = document.getElementsByClassName("active")
  var saveLastOpenParents = []
  Array.prototype.forEach.call(saveLastOpenChildrens, item => {
    saveLastOpenParents.push(item.parentElement.id)
  })
  console.log(saveLastOpenParents.length)
  localStorage.setItem("last-opened-breach", JSON.stringify(saveLastOpenParents))
}

function Item(props){
  //check if current item is cached in localStorage
  const lastOpened = localStorage.getItem("last-opened-breach")
  var isLastOpened = false
  Array.prototype.forEach.call(lastOpened, item => {
    if (parseInt(item, 10) === props.index){
      isLastOpened = true
    }
  });


  return(
    <div className="item" id={props.index}>
      <button className={isLastOpened ? "accordion active" : "accordion"} onClick={event => setUp(event)}>
        <img src={props.item.LogoPath} className="compnayLogo" />
        <a className="name">{props.item.Name}</a>
        <a className="date">{props.item.BreachDate}</a>
      </button>
      <div className="panel" style={isLastOpened ? {display:"block"} : {display:"none"}}>
        <p>{ReactHtmlParser(props.item.Description)}</p>
      </div>
    </div>
  )
}

export default Item
