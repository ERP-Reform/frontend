// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import './Chinese.css';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'department',
  title: <span className="title-chinese">部门信息</span>,
  type: 'group',
  children: [
    {
      id: 'employee',
      title: <span className="title-chinese">雇员管理</span>,
      type: 'item',
      url: '/employees',
      icon: icons.LoginOutlined
    },
    {
      id: 'vendor',
      title: <span className="title-chinese">供应商管理</span>,
      type: 'item',
      url: '/vendors',
      icon: icons.LoginOutlined
    }
  ]
};

export default pages;
