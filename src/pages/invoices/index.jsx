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
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!getInvoices.isLoading && getInvoices.isSuccess) {
      let data_ = getInvoices.data?.data.map((item) => {
        return {
          ...item?.fields,
          id: item.pk,
          SerialNo: item.pk
        };
      });

      setData(data_);
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
    axios.post(`http://localhost:8000/invoice/insert/`, invoice).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['invoices']
      });
      resetInvoice();
    });
  }, [invoice, queryClient, resetInvoice]);

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
