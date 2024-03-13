import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'SerialNo', headerName: '货号', width: 90 },
  {
    field: 'Category',
    headerName: '品名',
    width: 150,
    editable: true
  },
  {
    field: 'MakeUpId',
    headerName: '批号柜号',
    width: 150,
    editable: true
  },
  {
    field: 'Reference',
    headerName: '可溯源编号',
    width: 110,
    editable: true
  },
  {
    field: 'Qty',
    headerName: '数量',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
  },
  {
    field: 'Weight',
    headerName: '重量',
    width: 110,
    editable: true
  },
  {
    field: 'BoxPrice',
    headerName: '箱价',
    width: 110,
    editable: true
  },
  {
    field: 'WeightPrice',
    headerName: '斤价',
    width: 110,
    editable: true
  },
  {
    field: 'TotalPrice',
    headerName: '总价',
    width: 110,
    editable: true
  },
  {
    field: 'Buyer',
    headerName: '采购人',
    width: 110,
    editable: true
  },
  {
    field: 'Vendor',
    headerName: '供应商',
    width: 110,
    editable: true
  },
  {
    field: 'CarLicense',
    headerName: '车牌',
    width: 110,
    editable: true
  },
  {
    field: 'NoteOne',
    headerName: '备注1',
    width: 110,
    editable: true
  },
  {
    field: 'NoteTwo',
    headerName: '备注2',
    width: 110,
    editable: true
  },
];

const chineseLocaleText = {
  // Localize column menu labels
  columnHeaderFiltersLabel: '筛选器',
  columnHeaderSortAscending: '升序排序',
  columnHeaderSortDescending: '降序排序',
};

export default function DataT() {
  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
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
            borderColor: 'rgba(224, 224, 224, 1)',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'rgba(240, 240, 240, 1)',
            borderBottom: `2px solid`,
            borderColor: 'rgba(240, 240, 240, 1)',
          },
        }}
      />
    </Box>
  );
}
