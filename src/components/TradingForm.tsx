
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";

interface OrderType {
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  amount: string;
  price?: string;
  total?: string;
}

const TradingForm = () => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  // Mock current price data - replace with real API call later
  const { data: currentPrice } = useQuery({
    queryKey: ['price', 'BTC'],
    queryFn: () => Promise.resolve(45000),
    refetchInterval: 10000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: OrderType = {
      type: orderType,
      side,
      amount,
      price: orderType === 'limit' ? price : undefined,
      total: orderType === 'limit' ? 
        (Number(price) * Number(amount)).toString() : 
        (currentPrice * Number(amount)).toString()
    };
    console.log('Submitting order:', order);
    // Add order submission logic here
  };

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Trade BTC/USD</h2>
        <div className="flex items-center gap-2">
          <ArrowDownUp className="w-5 h-5 text-muted-foreground" />
          <span className="text-xl font-semibold">${currentPrice?.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order Type Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/20 rounded-lg">
          <button
            type="button"
            className={`py-2 px-4 rounded-md transition-colors ${
              orderType === 'market' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary/30'
            }`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-md transition-colors ${
              orderType === 'limit' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-secondary/30'
            }`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>
        </div>

        {/* Buy/Sell Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/20 rounded-lg">
          <button
            type="button"
            className={`py-2 px-4 rounded-md transition-colors ${
              side === 'buy' 
                ? 'bg-success text-success-foreground' 
                : 'hover:bg-secondary/30'
            }`}
            onClick={() => setSide('buy')}
          >
            Buy
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-md transition-colors ${
              side === 'sell' 
                ? 'bg-warning text-warning-foreground' 
                : 'hover:bg-secondary/30'
            }`}
            onClick={() => setSide('sell')}
          >
            Sell
          </button>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Amount (BTC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.00"
            step="0.00001"
          />
        </div>

        {/* Price Input (for Limit Orders) */}
        {orderType === 'limit' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Limit Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="0.00"
            />
          </div>
        )}

        {/* Total in USD */}
        <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total</span>
            <span>
              ${(orderType === 'limit' ? 
                Number(price) * Number(amount) : 
                (currentPrice || 0) * Number(amount)
              ).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            side === 'buy'
              ? 'bg-success hover:bg-success/90 text-success-foreground'
              : 'bg-warning hover:bg-warning/90 text-warning-foreground'
          }`}
        >
          {side === 'buy' ? 'Buy BTC' : 'Sell BTC'}
        </button>
      </form>
    </div>
  );
};

export default TradingForm;
