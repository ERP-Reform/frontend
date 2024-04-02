// material-ui

// project import
import axios from 'axios';
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import { useCallback, useEffect, useMemo, useState } from 'react';

import DataT from 'components/tables/DataTable';
import { columns as config } from 'components/tables/config';
import { useBatchDeleteInvoices, useCreateInvoice, useGetInvoices } from 'services/invoiceServices';

const Page = () => {
  const initialInvoice = useMemo(
    () =>
      config?.reduce((json, val) => {
        json[`${val.field}`] = '';
        return json;
      }, {}),
    []
  );

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [invoice, setInvoice] = useState(initialInvoice);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getInvoices = useGetInvoices(true);

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

  useEffect(() => {
    setIsLoading(getInvoices.isLoading);
  }, [getInvoices.isLoading]);

  const resetInvoice = useCallback(() => {
    setInvoice(initialInvoice);
  }, [initialInvoice]);

  const handleSelectionChange = (selectedIDs) => {
    setSelectedIds(selectedIDs);
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

  const handleOnDeleteSuccess = useCallback(
    (response) => {
      if (response.status === 200) {
        // Handle successful deletion
        // e.g., by refreshing the list of invoices or removing the deleted rows from state
        alert('Selected invoices have been deleted.');
        // Assuming you have a function to fetch the updated list
        resetInvoice();
      } else {
        // Handle error
        alert('There was an error deleting the selected invoices.');
      }
    },
    [resetInvoice]
  );

  const createInvoice = useCreateInvoice(invoice, resetInvoice);

  const batchDeleteInvoices = useBatchDeleteInvoices(selectedIds, handleOnDeleteSuccess);

  const handleBatchDelete = useCallback(() => {
    batchDeleteInvoices.mutate();
  }, [batchDeleteInvoices]);

  const handleAddInvoice = useCallback(() => {
    createInvoice.mutate();
  }, [createInvoice]);

  // fetch all vendors
  const vendorOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const handleOnOptionChange = useCallback(
    (choice) => {
      console.log('react-select-choices:', choice);
      console.log(selectedVendor);
      setSelectedVendor(choice);
    },
    [selectedVendor]
  );

  return (
    <MainCard title="货单">
      <InvoiceForm
        invoice={invoice}
        setInvoice={setInvoice}
        handleInvoiceSearch={handleInvoiceSearch}
        handleDeleteInvoice={handleBatchDelete}
        handleAddInvoice={handleAddInvoice}
        setQuery={setQuery}
        vendorOptions={vendorOptions}
        handleOnOptionChange={handleOnOptionChange}
      />
      <DataT isLoading={isLoading} data={data} columnConfigs={config} onSelectionChange={handleSelectionChange} />
    </MainCard>
  );
};

export default Page;
