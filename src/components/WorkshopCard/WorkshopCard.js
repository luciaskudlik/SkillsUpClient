import React, { Component } from "react";
import { Link } from "react-router-dom";
import './WorkshopCard.css';

function WorkshopCard(props) {
  const workshop = props.workshop;

    return (
      <div className="workshop-card">
        
          <img className="workshop-card-img" src={workshop.img} alt=""/>
        
        <h3>{workshop.title}</h3>
        <p>{workshop.credits}</p>
        <Link to={`/workshops/${workshop._id}`}><button>Learn More</button></Link>
        
      </div>
      
    );
  
}

export default WorkshopCard;