import React from "react";

const Button = ({ onClick, children,
    type=' button',
    bgColor = 'bg-blue-600', textColor = 'text-white',className = '',
    ...props
 }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 duration-200 hover:bg-blue-100 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
