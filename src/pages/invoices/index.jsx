// material-ui

// project import
import axios from 'axios';
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import DataTable from 'components/tables/DataTable';
import { useCallback, useEffect, useMemo, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //
import { useQueryClient } from '@tanstack/react-query';
import { columns as config } from 'components/tables/config';
import { useBatchDeleteInvoices, useGetInvoices } from 'services/invoiceServices';

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

  const handleOnRowSelectionChange = useCallback((ids) => {
    setSelectedIds(ids);
  }, []);

  const parseData = useCallback((data) => {
    return data?.map((item) => {
      return {
        ...item?.fields,
        id: item.pk,
        SerialNo: item.pk
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
  }, [batchDeleteInvoices]);

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
        handleDeleteInvoice={handleBatchDelete}
        handleAddInvoice={handleAddInvoice}
        setQuery={setQuery}
      />
      <DataTable data={data} columnConfigs={config} handleOnRowSelectionChange={handleOnRowSelectionChange} />
    </MainCard>
  );
};

export default Page;
