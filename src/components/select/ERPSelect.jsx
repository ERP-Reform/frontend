/* eslint-disable react/prop-types */
import Select from 'react-select';

export default function ERPSelect({ ...props }) {
  const { options, handleOnChange } = props;
  return (
    <Select
      isMulti={false}
      name="erpSelect"
      options={options}
      className="react-select"
      classNamePrefix="select"
      onChange={handleOnChange}
    />
  );
}
