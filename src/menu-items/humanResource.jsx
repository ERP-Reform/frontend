// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'humanResource',
  title: '人力资源',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: '雇员',
      type: 'item',
      url: '/employees',
      icon: icons.LoginOutlined
    }
  ]
};

export default pages;
