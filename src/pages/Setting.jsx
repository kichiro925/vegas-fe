import React from "react";
import { Routes, Route } from "react-router-dom";
import SettingHeader from "../components/modal/setting/SettingHeader";
import SettingBody from "../components/modal/setting/SettingBody";

const Setting = () => {
    
    return (
        <div className="absolute flex flex-col z-[200] w-full bg-settingBg overflow-y-auto"
            style={{ 
                borderImage: 'linear-gradient(to right, #6d23c2, #470048) 1',
                borderStyle: 'solid',
                borderWidth: '3px',
                height: '100dvh', // 2rem = top/bottom margin
                maxHeight: '100dvh', // Prevent touching screen edges
                left: '0',
                margin: '0 auto',
                borderRadius: '0.5rem'
            }}>
            
            <SettingHeader />
            <SettingBody />
        </div>
    );
};

export default Setting;