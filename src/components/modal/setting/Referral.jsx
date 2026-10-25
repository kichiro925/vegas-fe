import React from "react";
import { Tooltip } from 'react-tooltip';
import { ImInfo } from "react-icons/im";

const Referral = () => {
    return (
        // <div className="flex flex-col w-full p-[1rem] pt-0 font-['oxanium']">
            <section className="mb-[100px]">
                <div className="p-1 screen-3:max-w-[1140px] screen-4:max-w-[960px] w-full mx-auto">
                    <br/>
                    <h5 className="text-referralTx">Referral system (BRING A FRIEND)</h5>
                    <h6 className="text-white flex">Invite friends to join VX and earn commission when they play!!!
                        <span className="font-serif cursor-pointer text-[24px]" data-tooltip-id="vx-tooltip" data-tooltip-html={`This truly is a Win Win feature!<br/>Your friends will enjoy VX<br/>and you will earn extra cash!!!`} ><ImInfo/></span>
                        <Tooltip id="vx-tooltip"/>
                    </h6>
                    
                    <div className="bg-attentionBg rounded-[0.25rem] text-center">
                        <div className="p-[0.5rem] text-[0.8rem] text-white">
                            Attention! You have a weak password. In the referral system your username is exposed to your "friends" so we advise using a strong password.
                        </div>
                    </div>
                    
                    <form id="form_aff_invite" className="p-[0.25rem] flex flex-wrap mb-[1rem] mx-[-15px]">
                        <div className="relative flex flex-wrap items-stretch w-full max-w-[100%] py-[0.5rem] px-[1rem]">
                            <label className="hidden sm:flex items-center justify-center px-[0.75rem] py-[0.375rem] mb-0 text-base font-normal leading-6 text-emailTx text-center whitespace-nowrap bg-emailBg border border-emailBd rounded-md min-w-[55px]">@
                            </label>
                            
                            <input type="email" className="block w-full flex-1 h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-6 text-emailTx bg-white border border-emailBd rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring max-w-[500px] rounded-tl-[5px] rounded-tr-[5px]" id="aff_email" name="aff_email" placeholder="Email" />
                            <button id="aff_email_btn" className="relative flex-1 h-[calc(1.5em+0.75rem+2px)] min-w-0 mb-0 text-white bg-saveBg border-saveBg inline-block text-center px-[0.75rem] py-[0.375rem] text-[1rem] leading-[1.5] transition-colors transition-shadow transition-border duration-150 ease-in-out">SEND INVITATION</button>
                        </div>
                    </form>
                    
                    <div className="relative w-full max-w-[100%] px-[15px] text-center">
                        <span>
                            <h6 className="text-referralTx2">
                                Don't know your friend's email? No problem, just share this link
                            </h6>
                            <button className="inline-block text-white bg-saveBg border-[1px] border-saveBg px-[0.75rem] py-[0.375rem] rounded-[0.25rem]">Share Now</button>
                        </span>
                    </div>
                    
                    <hr/>
                    
                    <h6 className="text-white flex">Accumulated commision from referrals. Collect to your balance (mininum $50)
                        <span className="font-serif cursor-pointer text-[24px]" data-tooltip-id="vx-tooltip" data-tooltip-html={`This amount is accumulated<br/> every time your referrals<br/> (friends) play`} ><ImInfo /></span>
                        <Tooltip id="vx-tooltip"/>
                    </h6>
                    
                    <form id="form_aff_collect" className="p-[0.25rem] row">
                        <div className="relative flex flex-wrap items-stretch w-full max-w-[100%] py-[0.5rem] px-[1rem]">
                            <label className="hidden sm:flex items-center justify-center px-[0.75rem] py-[0.375rem] mb-0 text-base font-normal leading-6 text-emailTx text-center whitespace-nowrap bg-emailBg border border-emailBd rounded-md min-w-[55px]">💰
                            </label>
                            
                            <input type="text" className="block w-full flex-1 h-[calc(1.5em+0.75rem+2px)] px-3 py-1.5 text-base font-normal leading-6 text-emailTx bg-white border border-emailBd rounded transition-colors duration-150 ease-in-out focus:outline-none focus:ring max-w-[500px] rounded-tl-[5px] rounded-tr-[5px]" id="aff_collect_amount" name="aff_collect_amount" readonly value="0.00" />
                            <button id="aff_collect_btn" className="relative flex-1 h-[calc(1.5em+0.75rem+2px)] min-w-0 mb-0 text-white bg-referralTx3 border-referralTx3 inline-block text-center px-[0.75rem] py-[0.375rem] text-[1rem] leading-[1.5] transition-colors transition-shadow transition-border duration-150 ease-in-out">COLLECT</button>
                            <button id="aff_collects_btn" className="relative flex-1 rounded-tr-[3px] rounded-br-[3px] h-[calc(1.5em+0.75rem+2px)] bg-referralTx5 border-referralTx5 min-w-0 mb-0 inline-block text-center px-[0.75rem] py-[0.375rem] text-[1rem] leading-[1.5] transition-colors transition-shadow transition-border duration-150 ease-in-out">HISTORY</button>
                        </div>
                    </form>
                    
                    <hr/>
                
                    <h6 className="text-white">REFERRALS (Friends)</h6>
                    
                    <h6 className="text-referralTx6">You have no referrals yet. When someone accepts your invitation he will show up here.</h6>
                
                    <div className="text-center">
                        <button id="aff_collects_btn" className="relative flex-1 mt-[1rem] mb-[3rem] rounded-[3px] h-[calc(1.5em+0.75rem+2px)] bg-referralTx5 border-referralTx5 w-full min-w-0 mb-0 inline-block text-center px-[0.75rem] py-[0.375rem] text-[1rem] leading-[1.5] transition-colors transition-shadow transition-border duration-150 ease-in-out">REFERRAL SYSTEM TRANSACTIONS</button>
                    </div>
                </div>
            </section>
        // </div>
    );
};

export default Referral;