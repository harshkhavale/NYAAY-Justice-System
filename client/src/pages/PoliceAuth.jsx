import React from 'react'
import { useState, useEffect } from 'react';
import StateDropdown from '../components/stateDropdown';
import PoliceStationDropdown from '../components/PoliceStationDropdown';
import DistrictDropdown from '../components/DistrictDropdown';
import indianData from '../constants';
import Navbar from '../components/Navbar'
import CaptchaGenerator from '../components/generateCapatcha';
import { indianPolice } from '../assets';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [passkey, setPasskey] = useState();
  const [selectedPoliceStation, setSelectedPoliceStation] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);
  const login = async () => {
    setProgress(true);
    const values = {
      departmentId,
      passkey,
      state: selectedState,
      district: selectedDistrict,
      policeStationName: selectedPoliceStation
    };
    const loggedInResponse = await fetch(
      "http://localhost:5001/api/police/auth",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await loggedInResponse.json();
    console.log("loggedIn", loggedIn)

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.station,
          token: loggedIn.token,
        })
      );



      setProgress(false);
      toast.success("login successfull!")
      navigate("/police/dashboard");
    }
    if (loggedIn.msg) {
      console.log(loggedIn.msg)
      toast.error(loggedIn.msg);
    }
  };

  useEffect(() => {
    if (selectedState) {
      // Get the districts for the selected state
      const stateData = indianData[selectedState];
      if (stateData) {
        const districtList = Object.keys(stateData.districts);
        setDistricts(districtList);
      }
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      // Get the police stations for the selected district
      const stateData = indianData[selectedState];
      if (stateData) {
        const districtData = stateData.districts[selectedDistrict];
        if (districtData) {
          setPoliceStations(districtData.policeStations);
        }
      }
    }
  }, [selectedState, selectedDistrict]);

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setSelectedDistrict(""); // Reset the selected district
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setSelectedDistrict(newDistrict);
  };

  return (
    <div className="login p-4  bg-no-repeat bg-cover " style={{ backgroundImage: `url(${indianPolice})` }}>
      <div className='shadow-md flex flex-col justify-center m-10 p-4 bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border text-white border-gray-100 w-1/2' >
        <p className=' text-2xl font-semibold my-2'>Police Authentication</p>
        <div className="id grid grid-cols-4 my-2">
          <label htmlFor="id" className=' col-span-1'>Department id : </label>
          <input type="text" name='id' className=' text-black col-span-2 ps-3 py-1 border border-slate-500 rounded-md' placeholder='Department Id' value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} />

        </div>

        <div>

        </div>
        <StateDropdown
          states={Object.keys(indianData)}
          selectedState={selectedState}
          onSelectState={handleStateChange}

        />
        <DistrictDropdown
          districts={districts}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleDistrictChange}
        />
        <PoliceStationDropdown
          policeStations={policeStations}
          onSelectPoliceStation={(selectedValue) => {
            // You can now access the selected police station value here
            console.log("Selected Police Station:", selectedValue);
            setSelectedPoliceStation(selectedValue);
            // You can save it in your component state or use it as needed
          }}
        />

        <div className="passkey grid grid-cols-4 my-2">
          <label htmlFor="passkey" className=' col-span-1'>Passkey : </label>
          <input type="text" name='passkey' className=' text-black col-span-2 ps-3 py-1 border border-slate-500 rounded-md' placeholder='Passkey' value={passkey}
            onChange={(e) => setPasskey(e.target.value)} />

        </div>
        <div className="captcha">
          <CaptchaGenerator />

        </div>
        <div className="btn flex justify-center items-center">
          <button className=' bg-slate-400 px-3 p-1 my-4  shadow-md rounded-md  ' onClick={login}>log in <LoginIcon /></button>
        </div>

      </div>
    </div>

  );
}

export default Login;
