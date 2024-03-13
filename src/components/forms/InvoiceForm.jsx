import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import React, { useState } from 'react';
import axios from 'axios';


const InvoiceForm = () => {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInvoiceSearch = async () => {
    try {
      // Replace `your_backend_endpoint` with your actual search endpoint
      const response = await axios.get(`http://localhost:8000/search/?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };  

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
          <TextField 
            required id="outlined-required" 
            label="货号"
            InputLabelProps={{ shrink: true }}
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
          <TextField id="outlined-disabled" label="品名(SELECT)" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="供应商(SELECT)" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="采购(SELECT)" InputLabelProps={{ shrink: true }} />
        </div>

        <div>
          <TextField required id="outlined-required" label="规格" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-disabled" label="批号柜号" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="批次" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="品牌" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="品牌" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="备注" InputLabelProps={{ shrink: true }} />
        </div>

        <div>
          <TextField required id="outlined-required" label="件数" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-disabled" label="重量" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="箱价" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="斤价" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="总金额" InputLabelProps={{ shrink: true }} />
        </div>

        <div>
          <TextField required id="outlined-required" label="可溯源编号" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-disabled" label="包装" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="欠款(checkbox)" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="按箱/按斤" InputLabelProps={{ shrink: true }} />
          <TextField id="outlined-password-input" label="代销/自营" InputLabelProps={{ shrink: true }} />
        </div>
        <Box sx={{ display: 'flex', alignContent: 'center', gap: 4, m: 1 }}>
          <Button size="small" variant="contained" onClick={handleInvoiceSearch}>
            查询
          </Button>
          
          <Button size="small" variant="contained" color="error">
            删除记录
          </Button>

          <Button size="small" variant="contained">
            添加
          </Button>

        </Box>
      </Box>
      <hr />
    </>
  );
};

export default InvoiceForm;
