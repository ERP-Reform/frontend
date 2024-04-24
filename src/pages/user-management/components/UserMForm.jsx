/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import FormTextField from 'components/forms/FormTextField';

import CustomButton from 'components/smallcomp/CustomButton';
import { useCallback } from 'react';
const UserForm = (props) => {
  const { users, setUsers, handleSubmit } = props;

  const handleChange = useCallback(
    (event) => {
      setUsers((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [setUsers]
  );

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          borderColor: 'black'
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <FormTextField required={true} label="ID" name="id" value={users?.id} onChange={handleChange} />
          <FormTextField required={true} label="权限" name="priority" value={users?.priority} onChange={handleChange} />
          <FormTextField required={true} label="姓名" name="name" value={users?.name} onChange={handleChange} />
          <FormTextField required={true} label="公司" name="company" value={users?.company} onChange={handleChange} />
          <FormTextField required={true} label="联系电话" name="cellphone" value={users?.cellphone} onChange={handleChange} />
          <FormTextField label="车牌" name="CarLicense" value={users?.CarLicense} onChange={handleChange} />
        </div>

        <div>
          <FormTextField label="备注1" name="Note_One" value={users?.Note_One} onChange={handleChange} />
          <FormTextField label="备注2" name="Note_Two" value={users?.Note_Two} onChange={handleChange} />
        </div>
        <Box sx={{ display: 'flex', alignContent: 'center', gap: 4, m: 1 }}>
          <CustomButton text="添加" onClick={handleSubmit} backgroundColor="#007bff" hoverColor="#0056b3" />
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default UserForm;
