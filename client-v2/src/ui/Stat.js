const Stat = ({ children, title, description, className }) =>
  (<div className="stat place-items-center">
    <div className="stat-title">{title}</div>
    <div className="stat-value grid">{children}</div>
    <div className="stat-desc wrap whitespace-normal">
      <p>{description}</p>
    </div>
  </div>);

export default Stat;
