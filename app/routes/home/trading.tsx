import { useNavigate } from 'react-router';
import { TradingDetail } from '../../pages/trading/index';

export const meta = () => {
  return [{ title: "交易" }];
};

export default function TradingPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return <TradingDetail onBack={handleBack} />;
}
