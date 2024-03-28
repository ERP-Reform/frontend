export const columns = [
  { field: 'SerialNo', headerName: '货号', width: 150 },
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
    field: 'Note_One',
    headerName: '备注1',
    width: 110,
    editable: true
  },
  {
    field: 'Note_Two',
    headerName: '备注2',
    width: 110,
    editable: true
  }
];
