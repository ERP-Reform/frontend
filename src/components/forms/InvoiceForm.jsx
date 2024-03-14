/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

import { useCallback, useEffect } from 'react';
import FormTextField from './FormTextField';

const InvoiceForm = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleInvoiceSearch, setQuery, invoice, setInvoice, handleDeleteInvoice, handleAddInvoice } = props;

  const handleChange = useCallback(
    (event) => {
      setInvoice((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    [setInvoice]
  );

  useEffect(() => {
    setQuery(invoice?.SerialNo);
  }, [invoice?.SerialNo, setQuery]);

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
          <FormTextField required={true} label="货号" name="SerialNo" value={invoice?.SerialNo} onChange={handleChange} />
          <FormTextField required={true} label="品名" name="Category" value={invoice?.Category} onChange={handleChange} />
          <FormTextField required={true} label="供应商" name="Vendor" value={invoice?.Vendor} onChange={handleChange} />
          <FormTextField required={true} label="采购" name="Buyer" value={invoice?.Buyer} onChange={handleChange} />
          <FormTextField label="车牌" name="CarLicense" value={invoice?.CarLicense} onChange={handleChange} />
        </div>

        <div>
          <FormTextField label="批号柜号" name="MakeUpId" value={invoice?.MakeUpId} onChange={handleChange} />
          {/* <FormTextField label="规格" name="Specification" value={invoice?.Specification} onChange={handleChange} /> */}
          {/* <FormTextField label="批次" name="Batch" value={invoice?.Batch} onChange={handleChange} /> */}
          {/* <FormTextField label="品牌" name="Brand" value={invoice?.Brand} onChange={handleChange} /> */}

          <FormTextField label="备注1" name="Note_One" value={invoice?.Note_One} onChange={handleChange} />
          <FormTextField label="备注2" name="Note_Two" value={invoice?.Note_Two} onChange={handleChange} />
        </div>

        <div>
          <FormTextField label="数量" name="Qty" value={invoice?.Qty} onChange={handleChange} />
          <FormTextField label="箱价" name="BoxPrice" value={invoice?.BoxPrice} onChange={handleChange} />
        </div>
        <div>
          <FormTextField label="重量" name="Weight" value={invoice?.Weight} onChange={handleChange} />
          <FormTextField label="斤价" name="WeightPrice" value={invoice?.WeightPrice} onChange={handleChange} />
          <FormTextField label="总金额" name="TotalPrice" value={invoice?.TotalPrice} onChange={handleChange} />
        </div>

        <div>
          <FormTextField label="可溯源编号" name="Reference" value={invoice?.Reference} onChange={handleChange} />
          {/* <FormTextField label="包装" name="Package" value={invoice?.Package} onChange={handleChange} />
          <FormTextField label="欠款(checkbox)" name="Arrears" value={invoice?.Arrears} onChange={handleChange} />
          <FormTextField label="按箱/按斤" name="WeightType" value={invoice?.WeightType} onChange={handleChange} />
          <FormTextField label="代销/自营" name="OperationType" value={invoice?.OperationType} onChange={handleChange} /> */}
        </div>
        <Box sx={{ display: 'flex', alignContent: 'center', gap: 4, m: 1 }}>
          <Button size="small" variant="contained" onClick={handleInvoiceSearch}>
            查询
          </Button>

          <Button size="small" variant="contained" color="error" onClick={() => handleDeleteInvoice(invoice?.SerialNo)}>
            删除记录
          </Button>

          <Button size="small" variant="contained" onClick={handleAddInvoice}>
            添加
          </Button>
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default InvoiceForm;
