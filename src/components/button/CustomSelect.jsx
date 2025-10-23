import React from 'react';

const CustomSelect = ({
  title,
  options = [],
  value,
  onChange,
  required = false,
  name,
  register,
}) => {
  //   const id = title?.toLowerCase().replace(/\s+/g, '-');
  console.log("options ", options)

  return (
    <div className='flex flex-col p-2  w-full'>
      <select
        // id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className='border  rounded-lg px-3 py-2 shadow-sm focus:outline-none bg-[#004AAD] text-white' >
        <option value="">{title}</option>
        {options.map((option, idx) => (

          <option key={idx} value={option.id}>
            {option.label}

          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;

