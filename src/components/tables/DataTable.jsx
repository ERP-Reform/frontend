import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { columns } from './config';

const chineseLocaleText = {
  // Localize column menu labels
  columnHeaderFiltersLabel: '筛选器',
  columnHeaderSortAscending: '升序排序',
  columnHeaderSortDescending: '降序排序'
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
        rows={[]}
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
