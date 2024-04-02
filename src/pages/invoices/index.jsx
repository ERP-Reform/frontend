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
  const [selectedIds, setSelectedIds] = useState([]);

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

  // const handleDeleteInvoice = useCallback(
  //   (SerialNo) => {
  //     axios.delete(`http://localhost:8000/invoice/delete/${SerialNo}`).then(() => {
  //       const data_ = data.filter((invoice) => invoice?.SerialNo !== SerialNo);
  //       setData(data_);
  //       queryClient.invalidateQueries({
  //         queryKey: ['invoices']
  //       });
  //     });
  //     resetInvoice();
  //   },
  //   [data, queryClient, resetInvoice]
  // );

  const batchDeleteInvoices = useBatchDeleteInvoices(selectedIds);

  const handleBatchDelete = useCallback(() => {
    batchDeleteInvoices.mutate();
    console.log('ids to be deleted', selectedIds);
  }, [batchDeleteInvoices, selectedIds]);

  // const handleDeleteInvoice = async () => {
  //   const response = await fetch('http://localhost:8000/invoice/delete', {
  //     method: 'DELETE',
  //     body: JSON.stringify({ ids: selectedRows })
  //   });

  //   if (response.ok) {
  //     // Handle successful deletion
  //     // e.g., by refreshing the list of invoices or removing the deleted rows from state
  //     alert('Selected invoices have been deleted.');
  //     // Assuming you have a function to fetch the updated list
  //     resetInvoice();
  //   } else {
  //     // Handle error
  //     alert('There was an error deleting the selected invoices.');
  //   }
  // };

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

  // fetch all vendors
  const vendorOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const [selectedVendor, setSelectedVendor] = useState(null);

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
      <DataT data={data} columnConfigs={config} onSelectionChange={handleSelectionChange} />
    </MainCard>
  );
};

export default Page;
