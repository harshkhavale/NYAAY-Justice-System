import React, { useState } from 'react';

const PoliceStationDropdown = ({ policeStations, onSelectPoliceStation }) => {
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");

  const handlePoliceStationChange = (e) => {
    const newPoliceStation = e.target.value;
    setSelectedPoliceStation(newPoliceStation);
    onSelectPoliceStation(newPoliceStation); // Notify the parent component of the selected value
  };

  return (
    <div className="police-station-dropdown p-2 rounded-md ">
      <label htmlFor="policeStation">Police Station: </label>
      <select
        name="policeStation"
        value={selectedPoliceStation}
        onChange={handlePoliceStationChange}
        className=' text-black p-2 rounded-md '
      >
        <option value="">Select Police Station</option>
        {policeStations.map((station, index) => (
          <option key={index} value={station}>
            {station}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PoliceStationDropdown;
