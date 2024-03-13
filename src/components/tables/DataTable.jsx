import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { columns } from './config';

const chineseLocaleText = {
  // Localize column menu labels
  // https://github.com/mui/mui-x/blob/v6.19.4/packages/grid/x-data-grid/src/constants/localeTextConstants.ts
  columnMenuSortAsc: '升序排序',
  columnMenuSortDesc: '降序排序',
  columnMenuFilter: '筛选器',
  columnMenuHideColumn: '隐藏',
  columnMenuShowColumns: '显示',
  columnMenuManageColumns: '列选项'
};

export default function DataT(props) {
  // eslint-disable-next-line react/prop-types
  const { data } = props;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        localeText={chineseLocaleText}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 0,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell': {
            border: `1px solid`,
            borderColor: 'rgba(224, 224, 224, 1)'
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(240, 240, 240, 1)',
            borderBottom: `2px solid`,
            borderColor: 'rgba(240, 240, 240, 1)'
          }
        }}
      />
    </Box>
  );
}
