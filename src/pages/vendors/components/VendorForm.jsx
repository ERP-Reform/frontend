/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import FormTextField from 'components/forms/FormTextField';

import CustomButton from 'components/smallcomp/CustomButton';
import { useCallback } from 'react';
const VendorForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { vendors, setVendors, handleAddvendors } = props;

  const handleChange = useCallback(
    (event) => {
      setVendors((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [setVendors]
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
          <FormTextField required={true} label="姓名" name="SerialNo" value={vendors?.SerialNo} onChange={handleChange} />
          <FormTextField required={true} label="公司" name="Category" value={vendors?.Category} onChange={handleChange} />
          <FormTextField required={true} label="联系电话" name="Buyer" value={vendors?.Buyer} onChange={handleChange} />
          <FormTextField label="车牌" name="CarLicense" value={vendors?.CarLicense} onChange={handleChange} />
        </div>

        <div>
          <FormTextField label="备注1" name="Note_One" value={vendors?.Note_One} onChange={handleChange} />
          <FormTextField label="备注2" name="Note_Two" value={vendors?.Note_Two} onChange={handleChange} />
        </div>
        <Box sx={{ display: 'flex', alignContent: 'center', gap: 4, m: 1 }}>
          {/* <CustomButton text="查询" onClick={handlevendorsSearch} backgroundColor="#007bff" hoverColor="#0056b3" /> */}

          <CustomButton text="添加" onClick={handleAddvendors} backgroundColor="#007bff" hoverColor="#0056b3" />
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default VendorForm;
