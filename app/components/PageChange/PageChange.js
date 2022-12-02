import React from "react";

export default function PageChange(props) {
  return (
    <div className="w-[100vh] absolute">
      <div
        className="bg-cover fixed z-40 w-full h-full top-0 left-0 backdrop-blur-lg"
      ></div>
      <div className="top-0 left-0 w-full h-full block z-50 absolute bg-black bg-opacity-50"></div>
      <div className="my-32 mx-auto max-w-sm h-full text-center relative z-50 top-0">
        <div className="block mb-4">
          <i className="fas fa-circle-notch animate-spin text-slate-200 mx-auto text-6xl"></i>
        </div>
        <h4 className="text-lg font-medium text-slate-200">
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  );
}
