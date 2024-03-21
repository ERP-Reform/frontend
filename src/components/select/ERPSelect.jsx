/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';

function ERPSelect({ props }) {
  const { options, isMulti, handleOnChange, defaultValue } = props;
  return (
    <Select
      defaultValue={defaultValue}
      isMulti={isMulti}
      name="erpSelect"
      options={options}
      className="react-select"
      classNamePrefix="select"
      onChange={handleOnChange}
    />
  );
}

export default React.memo(ERPSelect);
