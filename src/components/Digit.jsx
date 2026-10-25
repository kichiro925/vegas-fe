import React from 'react';

const Digit = ({ number, className }) => {
  console.log(number, "number");
  if (number) {
    const digits = number?.toString().split('');

    return (
      <div className={`${className} flex flex-row items-center`}>
        {digits.map((digit, index) => (
          <img
            key={index}
            src={`/digits/${digit}.png`}
            alt={digit}
            className="h-full object-contain"
          />
        ))}
      </div>
    );
  }
};

export default Digit;