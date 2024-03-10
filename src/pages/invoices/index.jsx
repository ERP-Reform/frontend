// material-ui

// project import
import MainCard from 'components/MainCard';
import InvoiceForm from 'components/forms/InvoiceForm';
import DataTable from 'components/tables/DataTable';

// ==============================|| SAMPLE PAGE ||============================== //

const Page = () => (
  <MainCard title="货单">
    <InvoiceForm />
    <DataTable />
  </MainCard>
);

export default Page;
