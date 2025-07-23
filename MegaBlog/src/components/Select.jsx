import React,{useID} from "react";

function Select({ 
    options,
    label,  
    className = "", 
    ...props },ref) {
    const id = useID();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="inline-block mb-1 pl-1">
                    {label}
                </label>
            }
            <select 
            {...props} id={id} ref={ref}
            className={`border border-gray-300 rounded-md p-2 w-full ${className}`}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>

    );
}

export default React.forwardRef(Select);
