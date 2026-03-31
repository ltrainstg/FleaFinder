// FleaTable.jsx
import FleaButton from "./FleaButton";


const FleaTable= ({ data}) => {


  return (

      <div className="grid-container">

    {data &&  data.map((item) => (
          <FleaButton 
          key={item.id}
           name={item.id}
            id={item.id} 
            found={item.found} 
            link={item.link} />
  )) 
  }
    
  </div>


  );
};

export default FleaTable;