import "./docnav.css";
const DocNav = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("doc_id");
  };

  return (
    <div className="navbar">
      <h1>DocApp</h1>
      <p onClick={onLogout}>Logout</p>
    </div>
  );
};

export default DocNav;
