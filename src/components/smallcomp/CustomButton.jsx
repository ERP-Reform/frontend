import React from 'react';
import './button_style.css';

const CustomButton = ({ text, onClick, backgroundColor, hoverColor }) => {
  const buttonStyle = {
    '--button-bg-color': backgroundColor,
    '--button-hover-color': hoverColor
  };

  return (
    <button className={`custom-button`} style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default React.memo(CustomButton);
