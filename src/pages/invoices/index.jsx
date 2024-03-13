// material-ui

// project import
import axios from 'axios';
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import DataTable from 'components/tables/DataTable';
import { useCallback, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //
import { columns as config } from 'components/tables/config';

const Page = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');

  const [invoice, setInvoice] = useState(
    config?.reduce((json, val) => {
      json[`${val.field}`] = '';
      return json;
    }, {})
  );

  const handleInvoiceSearch = async () => {
    try {
      // Replace `your_backend_endpoint` with your actual search endpoint
      const response = await axios.get(`http://localhost:8000/search/?q=${query}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleDeleteInvoice = useCallback((SerialNo) => {
    console.log(`delete by SerialNo: ${SerialNo}`);
  }, []);

  const handleAddInvoice = useCallback(() => {
    console.log(invoice);
  }, [invoice]);

  return (
    <MainCard title="货单">
      <InvoiceForm
        invoice={invoice}
        setInvoice={setInvoice}
        handleInvoiceSearch={handleInvoiceSearch}
        handleDeleteInvoice={handleDeleteInvoice}
        handleAddInvoice={handleAddInvoice}
        setQuery={setQuery}
      />
      <DataTable data={data} />
    </MainCard>
  );
};

export default Page;
