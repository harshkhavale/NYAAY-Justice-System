import React from "react";

const StateDropdown = ({ states, selectedState, onSelectState }) => {
  return (
    <div className=" grid grid-cols-4 my-2 ">
      <label className="">State:</label>
      <select className=" border border-slate-400 rounded-md text-black p-2" value={selectedState} onChange={onSelectState}>
        <option value="" className=" text-black">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateDropdown;
