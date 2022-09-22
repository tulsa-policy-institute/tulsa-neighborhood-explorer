const Stat = ({ children, title, description, className }) =>
  (<div className="stat">
    <div className="stat-title">{title}</div>
    <div className="stat-value grid grid-cols-3">{children}</div>
    <div className="stat-desc wrap whitespace-normal">
      <p>{description}</p>
    </div>
  </div>);

export default Stat;
