import { useState, useEffect } from 'react';
import { KLineChart, type KLineData } from './KLineChart';

// 生成模拟 K 线数据
function generateMockKLineData(startTime: number, duration: number): KLineData[] {
  const data: KLineData[] = [];
  let basePrice = 92833;
  
  // 生成过去 duration 秒的数据，每秒一个点
  for (let i = duration; i >= 0; i--) {
    const time = startTime - i;
    
    // 模拟价格波动：随机游走 + 趋势
    const trend = Math.sin(i / 60) * 50; // 长期趋势
    const randomWalk = (Math.random() - 0.5) * 100; // 随机波动
    const noise = (Math.random() - 0.5) * 30; // 噪声
    
    basePrice = basePrice + trend / duration + randomWalk / duration + noise / duration;
    
    // 确保价格在合理范围内
    basePrice = Math.max(92500, Math.min(93500, basePrice));
    
    data.push({
      time,
      price: Math.round(basePrice * 100) / 100,
      volume: Math.floor(Math.random() * 1000) + 500,
    });
  }
  
  return data;
}

interface TradingChartProps {
  countdown?: number; // 倒计时时间（秒）
}

export function TradingChart({ countdown }: TradingChartProps) {
  const [kLineData, setKLineData] = useState<KLineData[]>([]);
  const [currentPrice, setCurrentPrice] = useState(92833.000);
  const [startTime] = useState(() => Math.floor(Date.now() / 1000)); // 记录开始时间
  
  // 从空数组开始，不初始化数据
  // 模拟实时数据更新（每秒添加一个新数据点）
  useEffect(() => {
    let basePrice = 92833;
    let dataIndex = 0;
    
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      
      // 计算新价格（基于上一个价格 + 随机波动）
      const change = (Math.random() - 0.5) * 30; // -15 到 +15 的随机变化（减小波动范围）
      basePrice = Math.max(92500, Math.min(93500, basePrice + change));
      
      const newDataPoint: KLineData = {
        time: startTime + dataIndex, // 从开始时间起，每秒递增
        price: Math.round(basePrice * 100) / 100,
        volume: Math.floor(Math.random() * 1000) + 500,
      };
      
      dataIndex++;
      
      // 添加新数据点
      setKLineData(prev => {
        const updated = [...prev, newDataPoint];
        // 保持最多20分钟的数据（1200个点）
        return updated.length > 20 * 60 ? updated.slice(-20 * 60) : updated;
      });
      
      setCurrentPrice(basePrice);
    }, 1000); // 每秒更新一次
    
    return () => clearInterval(interval);
  }, [startTime]);
  return (
    <div className="relative bg-[#1a1f2e] h-[60vh] min-h-[400px] pb-4">
      {/* Overlaid Trading Pair Title and Price Info */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-white">黄金 (XAU/USD)</div>
            <div className="text-xs text-gray-400 mt-1">交易时间: 05-29 10:47:37</div>
          </div>
        </div>
        
        {/* Price Info */}
        <div className="flex items-start gap-4">
          <div>
            <div className="text-[10px] text-gray-500 mb-0.5">成交价</div>
            <div className="text-white text-sm">{currentPrice.toFixed(3)}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-0.5">涨跌额</div>
            <div className={`text-xs ${kLineData.length > 1 && currentPrice >= kLineData[0].price ? 'text-green-400' : 'text-red-400'}`}>
              {kLineData.length > 1 
                ? `${currentPrice >= kLineData[0].price ? '+' : ''}${(currentPrice - kLineData[0].price).toFixed(2)}`
                : '0.00'
              }
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500 mb-0.5">涨跌幅</div>
            <div className={`text-xs ${kLineData.length > 1 && currentPrice >= kLineData[0].price ? 'text-green-400' : 'text-red-400'}`}>
              {kLineData.length > 1 
                ? `${currentPrice >= kLineData[0].price ? '+' : ''}${(((currentPrice - kLineData[0].price) / kLineData[0].price) * 100).toFixed(2)}%`
                : '0.00%'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="absolute inset-0 pt-24">
        {kLineData.length > 0 && (
          <KLineChart
            data={kLineData}
            currentPrice={currentPrice}
            countdownTime={countdown}
          />
        )}
      </div>

      {/* Bull/Bear Ratio Bar - Below X-Axis with more spacing */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-3 pt-8 z-10">
        <div className="flex items-center gap-2">
          {/* 看涨标签 + 百分比 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">看涨</span>
            <span className="text-xs text-teal-400 font-medium">67%</span>
          </div>
          
          {/* 进度条 - with opacity */}
          <div className="flex-1 flex items-center h-2.5 relative overflow-hidden rounded-full">
            {/* 看涨区域 - 青绿色，半透明 */}
            <div 
              className="bg-teal-500/40 h-full" 
              style={{ width: '67%' }}
            ></div>
            
            {/* 中间分隔符 - 更低调 */}
            <div className="w-0.5 h-full bg-white/30 absolute" style={{ left: '67%', transform: 'translateX(-50%)' }}></div>
            
            {/* 看跌区域 - 红色，半透明 */}
            <div 
              className="bg-red-500/40 h-full flex-1"
            ></div>
          </div>
          
          {/* 看跌百分比 + 标签 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-red-400 font-medium">33%</span>
            <span className="text-xs text-gray-400">看跌</span>
          </div>
        </div>
      </div>
    </div>
  );
}
