// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'invoice',
  title: '收支',
  type: 'group',
  children: [
    {
      id: 'invoice',
      title: '账单',
      type: 'item',
      url: '/invoices',
      icon: icons.LoginOutlined
    }
  ]
};

export default pages;
