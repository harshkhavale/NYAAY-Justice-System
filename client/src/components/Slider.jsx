import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { bannerData } from "../constants";
const Slider = () => {
  const [slideIndex,setSlideIndex] = useState(0);
  const handleClick = (direction) => {
     let size = bannerData.length-1;
      console.log("add size : ",size)
    if(direction === "left"){
      setSlideIndex(slideIndex>0?slideIndex-1:size)
      console.log("left clicked",slideIndex)
    }
    else{
      setSlideIndex(slideIndex<size?slideIndex+1:0)
      console.log("right click",slideIndex)

    }
  };
  return (
    <div className="slider flex overflow-hidden items-center relative">
      <div onClick={()=>handleClick("left")} className="leftarrow z-30  flex justify-center items-center h-min bg-slate-200 rounded-full p-2 w-auto cursor-pointer opacity-70 hover:opacity-100 absolute top-0 bottom-0 my-auto left-10" >
        <ArrowLeftIcon />
      </div>
      <div className="slide text-black flex">
        {bannerData.map((add, index) => (
          <div
            className=" flex flex-col overflow-hidden md:flex-row justify-center items-center w-screen transition-all ease-in-out duration-1000 "
            style={{translate:`${slideIndex * -100}vw`}}
            key={"key_" + index}
          >
            <div className="banner flex items-center  justify-start h-full ">
              <img src={add.banner} className="h-full -z-20 object-cover " alt="banner" />
            </div>
          
          </div>
        ))}
      </div>
      <div onClick={()=>handleClick("right")} className="rightarrow  flex justify-center items-center h-min bg-slate-200 rounded-full p-2 cursor-pointer opacity-70 hover:opacity-100 absolute top-0 bottom-0 my-auto right-10" >
        <ArrowRightIcon />
      </div>
    </div>
  );
};

export default Slider;
