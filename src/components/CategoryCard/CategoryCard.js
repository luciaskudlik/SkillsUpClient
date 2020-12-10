import React, { Component } from "react";
import { Link } from "react-router-dom";

function CategoryCard(props) {
 

    return (
       <Link to={`/workshops/category/${props.category}`}>
      <div id={props.id} className="categoryCard">
         <h3>{props.category}</h3>
      
      </div>
      </Link>
      
    );
  
}

export default CategoryCard;