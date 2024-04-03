import MainCard from 'components/MainCard';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CustomButton from 'components/smallcomp/CustomButton';
import DataT from 'components/tables/DataTable';
import { useBatchDeleteVendors, useCreateVendor, useGetVendors } from 'services/vendorServices';
import VendorForm from './components/VendorForm';
import config from './config';

const Page = () => {
  const emptyVendor = useMemo(
    () =>
      config?.reduce((json, val) => {
        json[`${val.field}`] = '';
        return json;
      }, {}),
    []
  );

  const [vendors, setVendors] = useState(emptyVendor);
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getVendors = useGetVendors(true);
  const createVendor = useCreateVendor(vendors);
  const batchDeleteVendors = useBatchDeleteVendors(selectedIds);

  const handleCreateVendor = useCallback(() => {
    createVendor.mutate();
  }, [createVendor]);

  const handleBatchDelete = useCallback(() => {
    batchDeleteVendors.mutate();
  }, [batchDeleteVendors]);

  const parseData = useCallback((data) => {
    return data?.map((item) => {
      return {
        ...item?.fields,
        id: item.pk
      };
    });
  }, []);

  useEffect(() => {
    if (!getVendors.isLoading && getVendors.isSuccess) {
      setData(parseData(getVendors?.data?.data));
    }
  }, [getVendors?.data?.data, getVendors.isLoading, getVendors.isSuccess, parseData]);

  useEffect(() => {
    setIsLoading(getVendors.isLoading);
  }, [getVendors.isLoading]);

  const handleOnRowSelectionChange = useCallback((ids) => {
    setSelectedIds(ids);
  }, []);

  return (
    <MainCard>
      <VendorForm vendors={vendors} setVendors={setVendors} handleSubmit={handleCreateVendor} />
      <div>
        <CustomButton text="删除" onClick={handleBatchDelete} backgroundColor="#dc3540" hoverColor="#c82333" />
      </div>
      <DataT isLoading={isLoading} data={data} columnConfigs={config} onSelectionChange={handleOnRowSelectionChange} />
    </MainCard>
  );
};

export default Page;
