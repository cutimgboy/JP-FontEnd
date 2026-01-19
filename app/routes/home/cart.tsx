import type { Route } from "./+types/cart";

export const meta: Route.MetaFunction = () => {
  return [{ title: "购物车" }];
};

export default function CartPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">购物车</h1>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex-1">
              <div className="font-semibold">商品 {item}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">¥99.00</div>
            </div>
            <div className="text-lg font-bold">×1</div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">合计：</span>
          <span className="text-xl font-bold text-red-500">¥297.00</span>
        </div>
      </div>
    </div>
  );
}
