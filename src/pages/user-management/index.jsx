import MainCard from 'components/MainCard';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CustomButton from 'components/smallcomp/CustomButton';
import DataT from 'components/tables/DataTable';

import { useBatchDeleteUsers, useCreateUsers, useGetUsers } from 'services/userMServices';
import UserForm from './components/UserMForm';
import config from './config';

const Page = () => {
  const emptyUser = useMemo(
    () =>
      config?.reduce((json, val) => {
        json[`${val.field}`] = '';
        return json;
      }, {}),
    []
  );

  const [users, setUsers] = useState(emptyUser);
  const [selectedIds, setSelectedIds] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUsers = useGetUsers(true);
  const createUsers = useCreateUsers(users);
  const batchDeleteUsers = useBatchDeleteUsers(selectedIds);

  const handleCreateUsers = useCallback(() => {
    createUsers.mutate();
  }, [createUsers]);

  const handleBatchDelete = useCallback(() => {
    batchDeleteUsers.mutate();
  }, [batchDeleteUsers]);

  const parseData = useCallback((data) => {
    return data?.map((item) => {
      return {
        ...item?.fields,
        id: item.pk
      };
    });
  }, []);

  useEffect(() => {
    if (!getUsers.isLoading && getUsers.isSuccess) {
      setData(parseData(getUsers?.data?.data));
    }
  }, [getUsers?.data?.data, getUsers.isLoading, getUsers.isSuccess, parseData]);

  useEffect(() => {
    setIsLoading(getUsers.isLoading);
  }, [getUsers.isLoading]);

  const handleOnRowSelectionChange = useCallback((ids) => {
    setSelectedIds(ids);
  }, []);

  return (
    <MainCard>
      <UserForm users={users} setUsers={setUsers} handleSubmit={handleCreateUsers} />
      <div>
        <CustomButton text="删除" onClick={handleBatchDelete} backgroundColor="#dc3540" hoverColor="#c82333" />
      </div>
      <DataT isLoading={isLoading} data={data} columnConfigs={config} onSelectionChange={handleOnRowSelectionChange} />
    </MainCard>
  );
};

export default Page;
