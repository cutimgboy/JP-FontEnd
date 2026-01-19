import { Outlet, useLocation, useNavigate } from 'react-router';
import { Tabbar, TabbarItem } from 'react-vant';
import type { Route } from './+types/_layout';

export const meta: Route.MetaFunction = () => {
  return [{ title: "首页" }];
};

export default function HomeLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Tabbar 配置
  const tabs = [
    { path: '/', label: '首页', icon: 'home-o' },
    { path: '/trading', label: '交易', icon: 'trading-o' },
    { path: '/category', label: '分类', icon: 'apps-o' },
    { path: '/cart', label: '购物车', icon: 'shopping-cart-o' },
    { path: '/profile', label: '我的', icon: 'user-o' },
  ];

  // 根据当前路径确定激活的 tab
  const getActiveTab = () => {
    const currentPath = location.pathname;
    // 精确匹配或匹配以路径开头的（处理子路由）
    const index = tabs.findIndex(tab => {
      return currentPath === tab.path || currentPath.startsWith(tab.path + '/');
    });
    return index >= 0 ? index : 0;
  };

  const activeTab = getActiveTab();

  const handleTabChange = (value: string | number) => {
    const index = value as number;
    if (tabs[index]) {
      navigate(tabs[index].path);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </div>

      {/* 底部 Tabbar */}
      <Tabbar
        value={activeTab}
        onChange={handleTabChange}
        fixed
        safeAreaInsetBottom
      >
        {tabs.map((tab, index) => (
          <TabbarItem
            key={tab.path}
            name={index}
            icon={tab.icon}
          >
            {tab.label}
          </TabbarItem>
        ))}
      </Tabbar>
    </div>
  );
}
