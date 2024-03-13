import TextField from '@mui/material/TextField';
import React from 'react';
function FormTextField(props) {
  // eslint-disable-next-line react/prop-types
  const { label, name, value, required, onChange } = props;

  return (
    <TextField
      required={required || false}
      label={label}
      name={name}
      InputLabelProps={{ shrink: true }}
      value={value}
      onChange={onChange}
    />
  );
}

export default React.memo(FormTextField);
