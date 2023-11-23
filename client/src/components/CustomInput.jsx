import React from 'react';

const CustomInput = ({
  type = 'text',
  placeholder = 'Enter text',
  onChange,
  value = '',
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
      style={{
        fontSize: "14px",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "500px",
        height: "50px",
      }}
    />
  );
};

export default CustomInput;
