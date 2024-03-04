// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'warehouse',
  title: '仓库',
  type: 'group',
  children: [
    {
      id: 'inventory',
      title: '库存',
      type: 'item',
      url: '/inventories',
      icon: icons.LoginOutlined
    }
  ]
};

export default pages;
