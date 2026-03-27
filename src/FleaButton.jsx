// FleaButton.jsx
import React from 'react';

const FleaButton = ({ name, id, found, link }) => {

      const divStyle1 = {
        backgroundColor: '#06d6a0', // Using camelCase and a string value
        padding: '20px',
        
  };

    const divStyle2 = {
    backgroundColor: '#ef476f', // Using camelCase and a string value
    padding: '20px',


  };

  return (
  <div key={id}  style={found ? divStyle1  : divStyle2}>

    
    <a className="button" href ="https://www.google.com" >
    {found ? "Found" : "Not Found"}

        {name} (ID: {id})
    </a>
      </div>

  );
};

export default FleaButton;