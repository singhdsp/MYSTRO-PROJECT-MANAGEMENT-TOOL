import React, { useState, useEffect } from "react";

const Overlay = ({ isOpen, setIsOpen, children }) => {
  return (
    <div
      className={`fixed pointer-events-auto top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-11/12 md:w-1/2 md:max-w-1/2 lg:w-1/3 lg:max-w-1/3 xl:w-1/4 xl:max-w-1/4 p-4 overflow-y-auto max-h-80 relative">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Overlay;
