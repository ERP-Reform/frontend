// material-ui

// project import
import axios from 'axios';
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import DataTable from 'components/tables/DataTable';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //
import { columns as config } from 'components/tables/config';
import { useGetInvoices } from 'services/invoiceServices';

const Page = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const initialInvoice = useMemo(
    () =>
      config?.reduce((json, val) => {
        json[`${val.field}`] = '';
        return json;
      }, {}),
    []
  );
  const [invoice, setInvoice] = useState(initialInvoice);

  const getInvoices = useGetInvoices(true);
  // const createInvoice = useCreateInvoice(invoice);

  useEffect(() => {
    if (!getInvoices.isLoading && getInvoices.isSuccess) {
      setData(getInvoices.data?.data?.data);
    }
  }, [getInvoices.data, getInvoices.isLoading, getInvoices.isSuccess]);

  const resetInvoice = useCallback(() => {
    setInvoice(initialInvoice);
  }, [initialInvoice]);

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

  const handleDeleteInvoice = useCallback(
    (SerialNo) => {
      console.log(`delete by SerialNo: ${SerialNo}`);
      const data_ = data.filter((invoice) => invoice?.SerialNo !== SerialNo);

      setData(data_);
      resetInvoice();
    },
    [data, resetInvoice]
  );

  const handleAddInvoice = useCallback(() => {
    // enable after the backend api support
    // createInvoice.mutate(invoice);
    const invoiceData = {
      ...invoice,
      id: invoice.SerialNo
    };
    setData((prevState) => [...prevState, invoiceData]);
    resetInvoice();
  }, [invoice, resetInvoice]);

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
