// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'department',
  title: '部门',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: '雇员',
      type: 'item',
      url: '/employees',
      icon: icons.LoginOutlined
    },
    {
      id: 'vendor',
      title: '供应商',
      type: 'item',
      url: '/vendors',
      icon: icons.LoginOutlined
    }
  ]
};

export default pages;
