const Card = ({ children, title, description, className }) => {
  return (<div className="card w-96 bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">Card title!</h2>
      {children}
    </div>
  </div>)
};

export default Card;
