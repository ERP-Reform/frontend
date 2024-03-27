import MainCard from 'components/MainCard';
import { useCallback, useEffect, useMemo, useState } from 'react';

import DataT from 'components/tables/DataTable';
import { useGetVendors } from 'services/vendorServices';
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
  const [data, setData] = useState([]);

  const getVendors = useGetVendors(true);

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

  return (
    <MainCard>
      <VendorForm vendors={vendors} setVendors={setVendors} handleAddvendors={null} />
      <DataT data={data} columnConfigs={config} />
    </MainCard>
  );
};

export default Page;
