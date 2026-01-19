import type { Route } from "./+types/profile";

export const meta: Route.MetaFunction = () => {
  return [{ title: "我的" }];
};

export default function ProfilePage() {
  const menuItems = [
    { icon: '📋', label: '我的订单', desc: '查看全部订单' },
    { icon: '❤️', label: '我的收藏', desc: '收藏的商品' },
    { icon: '📍', label: '收货地址', desc: '管理收货地址' },
    { icon: '⚙️', label: '设置', desc: '账户设置' },
  ];

  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <div className="text-xl font-bold">用户名</div>
            <div className="text-sm opacity-90">user@example.com</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</div>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
