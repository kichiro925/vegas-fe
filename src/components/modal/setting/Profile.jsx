import React, { useState } from "react";
import '@fontsource/oxanium';
import AntSwitch from './AntSwitch';
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";
import { UpdateEmail } from "../../../store/reducers/auth";
import { toast } from "react-toastify";

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const { changeEmail } = useApi();
    const [checked, setChecked] = useState(true);
    const [email, setEmail] = useState(user?.email);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSave = async () => {
        try {
            if (email === "" || !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                toast.error("Invalid email format");
                return;
            }
            const res = await changeEmail({ userId: user._id, email });
            if (res?.data?.status === true) {
                dispatch(UpdateEmail(email));
                toast.success("Email updated successfully!");
            } else {
            }
        } catch (error) {
            console.log(error, "error");
        }
    };

    return (
        <div>
            <div className="px-[1rem] w-full">
                <span className="opacity-[0.8]">Username: </span>
                <span className="text-white">{user?.username}</span>
                <div className="opacity-[0.8]">
                    Your email can be used for password recovery and extra bonus features and promotions.
                </div>
            </div>

            <div className="relative flex flex-wrap w-full items-stretch max-w-[100%] px-[1rem] py-2">
                <span className="hidden sm:flex items-center justify-center px-[0.75rem] py-[0.375rem] mb-0 text-base font-normal leading-6 text-emailTx text-center whitespace-nowrap bg-emailBg border border-emailBd rounded-md" style={{ minWidth: '55px' }}>✉</span>
                <input type="text" disabled={user?.email} value={email} onChange={(e) => setEmail(e.target.value)} className="relative rounded-[0px] flex-1 min-w-0 mb-0 block h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-[1.5] text-emailTx bg-white border border-emailBd rounded transition duration-150 ease-in-out" id="settings_email" name="email" placeholder="Email" style={{ maxWidth: '500px' }} />
                {
                    !user?.email ? (
                        <span className="flex !p-1 items-center justify-center px-[0.75rem] py-[0.375rem] mb-0 text-base font-normal leading-6 text-emailTx text-center whitespace-nowrap bg-emailBg border border-emailBd rounded-[0.25rem]">
                            <h6 className="mb-0" id="settings_email_confirmation">⚠ Unconfirmed</h6>
                        </span>) :
                        <span className="flex !p-1 items-center justify-center px-[0.75rem] py-[0.375rem] mb-0 text-base font-normal leading-6 text-emailTx text-center whitespace-nowrap bg-emailBg border border-emailBd rounded-[0.25rem]">
                            <h6 className="mb-0" id="settings_email_confirmation">✅ Confirmed</h6>
                        </span>
                }
            </div>

            {/* <div className="flex py-2 px-[1rem] max-w-[100%] relative flex-wrap items-stretch w-full">
                <div className="flex items-center pl-[2.25rem] relative block z-[1] min-h-[1.5rem]">
                    <div className="absolute left-0 z-[-1] w-[1rem]">
                        <AntSwitch checked={checked} onChange={handleChange} />
                    </div>
                    <label className="relative opacity-[0.8] mb-0 align-top inline-block" for="settings_shownewscheck">
                        Show News Box
                    </label>
                </div>
            </div> */}

            <div className="flex px-[15px] py-2 max-w-[100%]">
                <button
                    disabled={user?.email}
                    onClick={handleSave} className="inline-block text-white bg-saveBg border-[1px] border-saveBg px-[0.75rem] py-[0.375rem] rounded-[0.25rem]">SAVE</button>
            </div>

        </div>
    );
};

export default Profile;