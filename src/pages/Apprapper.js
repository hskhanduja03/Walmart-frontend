import React from "react";

const AppWrapper = ({ children }) => {
  return (
    <div className=" max-width: 100% overflow-x-hidden ">
      {" "}
      {children}
    </div>
  );
};

export default AppWrapper;
