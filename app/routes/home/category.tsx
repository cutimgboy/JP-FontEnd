import type { Route } from "./+types/category";

export const meta: Route.MetaFunction = () => {
  return [{ title: "分类" }];
};

export default function CategoryPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">分类</h1>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center"
          >
            <div className="text-4xl mb-2">📦</div>
            <div className="text-sm">分类 {item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
