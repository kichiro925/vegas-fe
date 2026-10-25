import React from 'react';

const DiceNumber = ({ number = 0, id = 1 }) => {

    const numberString = number.toString().padStart(7, '0');
    
    return (
        <div id={`jackpot${id}`}>
            <div className='digit-space relative w-[1.03vw] h-[5vh] overflow-hidden float-left' />
            {numberString.split('').map((digit, index) => (
                <div key={`jackpot${id}-digit${index}`} id={`jackpot${id}-digit${index}`} className='relative w-[2.06vw] h-[5vh] overflow-hidden float-left'>
                    <div 
                        className="digit absolute w-[2.06vw] h-[55vh]" 
                        id={`jackpot${id}-digit-bg${index}`} 
                        style={{
                            top: `-${parseInt(digit) * 5}vh`
                        }} 
                    />
                </div>
            ))}
            <div style={{clear: 'both'}} />
        </div>
    );
};

export default DiceNumber;

