import React from "react";
import { useSelector } from "react-redux";
import HelpHeader from "../components/modal/help/HelpHeader";
import HelpBody from "../components/modal/help/HelpBody";

const Help = () => {
  // const isReferral = useSelector(state => state.modal.isReferral);

  return (
    <div
      className="absolute flex flex-col z-[200] w-full h-screen bg-settingBg h-auto max-w-[100%] min-h-[100%] rounded-[0px]"
      style={{
        borderImage: "linear-gradient(to right, #6d23c2, #470048) 1",
        borderStyle: "solid",
        borderWidth: "3px",
      }}
    >
      <HelpHeader />
      <HelpBody />
    </div>
  );
};

export default Help;
