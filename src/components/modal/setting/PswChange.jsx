import React, { useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

const PswChange = () => {
    const { changePassword } = useApi();
    const user = useSelector(state => state.auth.user);
    const [currentpass, setCurrentpass] = useState("");
    const [newpass, setNewpass] = useState("");
    const [confirmNewpass, setConfirmNewpass] = useState("");

    const handleChangePassword = async () => {
        try {
            if (newpass !== confirmNewpass) {
                toast.error("New password and confirm new password do not match");
                return;
            }
            if (newpass.length === 0) {
                toast.error("New password is empty");
                return;
            }

            const res = await changePassword({ userId: user._id, currentpass, newpass });
            if (res?.data) {
                toast.success("Password updated successfully!");
            } else {
            }
        } catch (error) {
            console.log(error, "error")
        }
    }

    return (
        <div className="row p-[1rem] mb-[1rem] font-['oxanium']">
            <div className="relative w-full px-[15px]">
                <label for="password" className="m-auto inline-block opacity-[0.8]">Current Password</label>
                <input type="password" value={currentpass} onChange={(e) => setCurrentpass(e.target.value)} style={{ maxWidth: '500px' }} className="block w-full h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-6 text-emailTx bg-white border border-emailBd rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring" />
            </div>

            <div className="relative w-full px-[15px]">
                <label for="set_new_password" className="m-auto inline-block opacity-[0.8]">New Password</label>
                <input type="password" value={newpass} onChange={(e) => setNewpass(e.target.value)} style={{ maxWidth: '500px' }} className="block w-full h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-6 text-emailTx bg-white border border-emailBd rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring" />
            </div>

            <div className="relative w-full px-[15px]">
                <label for="set_new_password" className="m-auto inline-block opacity-[0.8]">Confirm New Password</label>
                <input type="password" value={confirmNewpass} onChange={(e) => setConfirmNewpass(e.target.value)} style={{ maxWidth: '500px' }} className="block w-full h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-6 text-emailTx bg-white border border-emailBd rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring" />
            </div>

            <div className="flex max-w-[100%] mt-[1rem] px-[15px]">
                <button className="inline-block text-white bg-saveBg border-[1px] border-saveBg px-[0.75rem] py-[0.375rem] rounded-[0.25rem]" onClick={handleChangePassword}>SAVE</button>
            </div>
        </div>
    );
};

export default PswChange;