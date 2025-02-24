
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";

interface OrderLevel {
  price: number;
  amount: number;
  total: number;
}

const OrderBook = () => {
  // Mock data - replace with real API call later
  const { data: orderBookData } = useQuery({
    queryKey: ['orderbook', 'BTC'],
    queryFn: () => Promise.resolve({
      bids: [
        { price: 44950, amount: 0.5, total: 22475 },
        { price: 44900, amount: 1.2, total: 53880 },
        { price: 44850, amount: 0.8, total: 35880 },
        { price: 44800, amount: 2.0, total: 89600 },
        { price: 44750, amount: 1.5, total: 67125 },
      ],
      asks: [
        { price: 45000, amount: 0.3, total: 13500 },
        { price: 45050, amount: 0.7, total: 31535 },
        { price: 45100, amount: 1.0, total: 45100 },
        { price: 45150, amount: 0.5, total: 22575 },
        { price: 45200, amount: 1.8, total: 81360 },
      ],
    }),
    refetchInterval: 1000,
  });

  const maxTotal = Math.max(
    ...(orderBookData?.asks.map(a => a.total) || []),
    ...(orderBookData?.bids.map(b => b.total) || [])
  );

  const renderOrderRow = (order: OrderLevel, side: 'bid' | 'ask', maxTotal: number) => {
    const depthPercentage = (order.total / maxTotal) * 100;
    const bgColorClass = side === 'bid' ? 'bg-success' : 'bg-warning';

    return (
      <div key={order.price} className="relative grid grid-cols-3 py-1 text-sm">
        <div
          className={`absolute inset-0 ${bgColorClass} opacity-10`}
          style={{ width: `${depthPercentage}%` }}
        />
        <span className={`z-10 ${side === 'bid' ? 'text-success' : 'text-warning'}`}>
          {order.price.toLocaleString()}
        </span>
        <span className="z-10 text-right">{order.amount.toFixed(4)}</span>
        <span className="z-10 text-right text-muted-foreground">
          {order.total.toLocaleString()}
        </span>
      </div>
    );
  };

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Order Book</h2>
        <ArrowDownUp className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-3 text-sm text-muted-foreground mb-2">
        <span>Price (USD)</span>
        <span className="text-right">Amount (BTC)</span>
        <span className="text-right">Total (USD)</span>
      </div>

      {/* Asks (Sell Orders) */}
      <div className="space-y-1 mb-4">
        {orderBookData?.asks.map(ask => renderOrderRow(ask, 'ask', maxTotal))}
      </div>

      {/* Current Price */}
      <div className="border-y border-secondary py-2 mb-4">
        <div className="text-center font-semibold text-lg">
          ${orderBookData?.asks[0].price.toLocaleString()}
        </div>
      </div>

      {/* Bids (Buy Orders) */}
      <div className="space-y-1">
        {orderBookData?.bids.map(bid => renderOrderRow(bid, 'bid', maxTotal))}
      </div>
    </div>
  );
};

export default OrderBook;
