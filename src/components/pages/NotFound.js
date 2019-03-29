import React from "react";

export default () => {
  return (
    <React.Fragment>
      <div style={{ position: "absolute", right: "505px", top: "100px" }}>
        <h2>
          <span className="text-danger">404</span> Page Not Found
        </h2>
        <p className="lead">
          Sorry, that page does not exist.
          <span className="fas fa-frown ml-3" />
        </p>
      </div>
    </React.Fragment>
  );
};
