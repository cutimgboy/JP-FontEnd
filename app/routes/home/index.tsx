import type { Route } from "./+types/index";
import { useTranslation } from 'react-i18next';
import { Welcome } from "../../welcome/welcome";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";

export const meta: Route.MetaFunction = () => {
  return [{ title: "首页" }];
};

export default function HomeIndex() {
  const { t } = useTranslation('home');
  
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{t('description')}</p>
      <Welcome />
    </div>
  );
}
