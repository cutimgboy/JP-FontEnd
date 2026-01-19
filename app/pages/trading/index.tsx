import { useState, useEffect } from 'react';
import { NavigationHeader } from './components/NavigationHeader';
import { TradingChart } from './components/TradingChart';
import { TradingControls } from './components/TradingControls';
import { MarketOverview } from './components/MarketOverview';
import { CoinIntroduction } from './components/CoinIntroduction';
import { TradingHours } from './components/TradingHours';
import { TimeSelector } from './components/TimeSelector';

interface TradingDetailProps {
  onBack: () => void;
}

export function TradingDetail({ 
  onBack
}: TradingDetailProps) {
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState('00:30');
  const [tempSelectedTime, setTempSelectedTime] = useState('00:30');
  const [investmentAmount, setInvestmentAmount] = useState('100000');
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'bull' | 'bear' | 'completed'>('idle');
  const [countdown, setCountdown] = useState(0);

  const timeOptions = [
    { value: '00:30', label: '30S' },
    { value: '01:00', label: '1min(60s)' },
    { value: '03:00', label: '3min(180s)' },
    { value: '05:00', label: '5min(300s)' },
  ];

  const handleConfirmTime = () => {
    setSelectedTime(tempSelectedTime);
    setShowTimeSelector(false);
  };

  const handleBullTrade = () => {
    const seconds = parseInt(selectedTime.split(':')[0]) * 60 + parseInt(selectedTime.split(':')[1]);
    setCountdown(seconds);
    setTradeStatus('bull');
  };

  const handleBearTrade = () => {
    const seconds = parseInt(selectedTime.split(':')[0]) * 60 + parseInt(selectedTime.split(':')[1]);
    setCountdown(seconds);
    setTradeStatus('bear');
  };

  const handleResetTrade = () => {
    setTradeStatus('idle');
    setCountdown(0);
  };

  // Countdown effect
  useEffect(() => {
    if (countdown > 0 && (tradeStatus === 'bull' || tradeStatus === 'bear')) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setTradeStatus('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, tradeStatus]);

  return (
    <div className="min-h-screen bg-[#1a1f2e] pb-[280px]">
      <NavigationHeader onBack={onBack} />
      <TradingChart countdown={countdown} />
      
      <TradingControls
        selectedTime={selectedTime}
        investmentAmount={investmentAmount}
        tradeStatus={tradeStatus}
        countdown={countdown}
        onTimeClick={() => {
          if (tradeStatus === 'idle') {
            setTempSelectedTime(selectedTime);
            setShowTimeSelector(true);
          }
        }}
        onInvestmentChange={setInvestmentAmount}
        onBullTrade={handleBullTrade}
        onBearTrade={handleBearTrade}
        onResetTrade={handleResetTrade}
      />

      <MarketOverview />
      <CoinIntroduction />
      <TradingHours />

      <TimeSelector
        isOpen={showTimeSelector}
        selectedTime={selectedTime}
        tempSelectedTime={tempSelectedTime}
        timeOptions={timeOptions}
        onClose={() => setShowTimeSelector(false)}
        onSelectTime={setTempSelectedTime}
        onConfirm={handleConfirmTime}
      />
    </div>
  );
}
