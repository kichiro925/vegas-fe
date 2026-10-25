import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setIsProfile, setIsReferral, setIsPswChange } from "../../../store/reducers/modal";
import { useDispatch } from 'react-redux'
import Profile from "./Profile";
import PswChange from "./PswChange";
import Referral from "./Referral";
import "../../../assets/css/setting.css"

const SettingBody = () => {
    const dispatch = useDispatch();
    const isReferral = useSelector(state => state.modal.isReferral);
    const isPswChange = useSelector(state => state.modal.isPswChange);
    const isProfile = useSelector(state => state.modal.isProfile);

    const handleProfile = () => {
        dispatch(setIsProfile(true));
        dispatch(setIsReferral(false));
        dispatch(setIsPswChange(false));
    };

    const handlePswChange = () => {
        dispatch(setIsProfile(false));
        dispatch(setIsReferral(false));
        dispatch(setIsPswChange(true));
    };

    const handleReferral = () => {
        dispatch(setIsProfile(false));
        dispatch(setIsReferral(true));
        dispatch(setIsPswChange(false));
    };

    return (
        <div className="referral-body flex-1 min-h-[800px]">
            <style>
                {`
                    @keyframes blink {
                        0%, 100% {
                        background-color: cyan;
                        }
                        50% {
                        background-color: initial;
                        }
                    }

                    .blink-cyan {
                        animation: blink 1s infinite;
                    }
                `}
            </style>

            <div id="settings_messagebox" className="alert alert-secondary" style={{ display: 'none' }} role="alert">
            </div>

            <ul className="nav nav-tabs !mt-0" role="tablist">
                <li className="nav-item">
                    <button onClick={handleProfile} className={`nav-link ${isProfile ? 'active' : ''} `}>Profile</button>
                </li>
                <li className="nav-item">
                    <button onClick={handlePswChange} className={`nav-link ${isPswChange ? 'active' : ''} `}>Change pass.</button>
                </li>
                {/* <li className="nav-item">
                    <button onClick={handleReferral} className={`nav-link ${isReferral ? 'active' : ''} `}>Referral</button>
                </li> */}
            </ul>

            <div className="tab-content flex-1 overflow-hidden pt-[15px]" id="myTabContent">
                <div className={`tab-pane fade h-full ${isProfile ? '!block' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {isProfile && (<Profile />)}
                </div>
                <div className={`tab-pane fade h-full ${isPswChange ? '!block' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {isPswChange && (<PswChange />)}
                </div>
                {/* <div className={`tab-pane fade h-full ${isReferral ? '!block' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    { isReferral && ( <Referral /> ) }
                </div> */}
            </div>
        </div>
    );
};

export default SettingBody;