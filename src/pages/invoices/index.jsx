// material-ui

// project import
import axios from 'axios';
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //
import { useQueryClient } from '@tanstack/react-query';
import DataT from 'components/tables/DataTable';
import { columns as config } from 'components/tables/config';
import { useGetInvoices } from 'services/invoiceServices';

const Page = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

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

  const parseData = useCallback((data) => {
    return data?.map((item) => {
      return {
        ...item?.fields,
        id: item.pk
      };
    });
  }, []);
  useEffect(() => {
    if (!getInvoices.isLoading && getInvoices.isSuccess) {
      setData(parseData(getInvoices?.data?.data));
    }
  }, [getInvoices.data, getInvoices.isLoading, getInvoices.isSuccess, parseData]);

  const resetInvoice = useCallback(() => {
    setInvoice(initialInvoice);
  }, [initialInvoice]);

  const handleSelectionChange = (selectedIDs) => {
    setSelectedRows(selectedIDs);
  };

  const handleInvoiceSearch = async () => {
    try {
      // Replace `your_backend_endpoint` with your actual search endpoint
      const response = await axios.get(`http://localhost:8000/invoice/search/?q=${query}`);
      setData(parseData(response.data));
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleDeleteInvoice = async () => {
    const response = await fetch('http://localhost:8000/invoice/delete', {
      method: 'DELETE',
      body: JSON.stringify({ ids: selectedRows })
    });

    if (response.ok) {
      // Handle successful deletion
      // e.g., by refreshing the list of invoices or removing the deleted rows from state
      alert('Selected invoices have been deleted.');
      // Assuming you have a function to fetch the updated list
      resetInvoice();
    } else {
      // Handle error
      alert('There was an error deleting the selected invoices.');
    }
  };

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
        handleAddInvoice={handleAddInvoice}
        handleDeleteInvoice={handleDeleteInvoice}
        setQuery={setQuery}
      />
      <DataT data={data} onSelectionChange={handleSelectionChange} />
    </MainCard>
  );
};

export default Page;
