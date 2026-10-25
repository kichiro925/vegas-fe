import React, { useState } from "react";
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import '@fontsource/oxanium';
import { setIsSettingModal } from "../../../store/reducers/modal";

const SettingHeader = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="flex flex-col w-full font-['oxanium']">
            <div className="flex w-full h-[4.4rem] items-start justify-between p-4 border-b border-settingHeadBorder rounded-t-[calc(0.3rem-1px)]">
                <h4 className="text-[1.5rem] mb-0 leading-relaxed opacity-[0.8]">SETTINGS</h4>
                
                <button type="button" className="opacity-[0.5]">
                    <XMarkIcon aria-hidden="true" onClick={ () => {dispatch(setIsSettingModal(false)) }} className="w-[28px] h-[28px]" />
                </button>
            </div>
        </div>
    );
};

export default SettingHeader;