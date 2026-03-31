// FleaButton.jsx
import React from 'react';

const FleaButton = ({ name, id, found, link }) => {

      const divStyle1 = {
        backgroundColor: '#06d6a0', // Using camelCase and a string value
        padding: '20px',
        border: '1px solid black',
        display: 'flex',
        
        
  };

    const divStyle2 = {
    backgroundColor: '#ef476f', // Using camelCase and a string value
    padding: '20px',
    border: '1px solid black',
    display: 'flex',


  };

  return (
  <div key={id}  style={found ? divStyle1  : divStyle2}>

    
    <a className="button" href = {`https://mapgenie.io/hollow-knight-silksong/maps/pharloom?locationIds=${link}`} >
    {found ? "Found" : "Not Found"}
        <br />
        {name} 
    </a>
      </div>

  );
};

export default FleaButton;