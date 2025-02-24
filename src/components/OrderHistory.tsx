
import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Order {
  id: string;
  type: 'market' | 'limit';
  side: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  total: number;
  status: 'open' | 'filled' | 'cancelled';
  timestamp: string;
}

const OrderHistory = () => {
  // Mock data - replace with real API call later
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => Promise.resolve([
      {
        id: '1',
        type: 'market',
        side: 'buy',
        symbol: 'BTC',
        amount: 0.5,
        price: 45000,
        total: 22500,
        status: 'filled',
        timestamp: '2024-02-24T10:00:00Z',
      },
      {
        id: '2',
        type: 'limit',
        side: 'sell',
        symbol: 'BTC',
        amount: 0.25,
        price: 46000,
        total: 11500,
        status: 'open',
        timestamp: '2024-02-24T09:30:00Z',
      },
      {
        id: '3',
        type: 'market',
        side: 'buy',
        symbol: 'ETH',
        amount: 2.0,
        price: 2800,
        total: 5600,
        status: 'filled',
        timestamp: '2024-02-24T09:00:00Z',
      },
    ] as Order[]),
    refetchInterval: 30000,
  });

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>

      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-secondary/10 rounded-lg border border-secondary/20"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {order.side === 'buy' ? (
                  <ArrowDownRight className="w-5 h-5 text-success" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-warning" />
                )}
                <span className="font-medium">
                  {order.side === 'buy' ? 'Buy' : 'Sell'} {order.symbol}
                </span>
              </div>
              <span className={`text-sm ${
                order.status === 'filled' ? 'text-success' :
                order.status === 'open' ? 'text-primary' :
                'text-warning'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Amount:</span>
                <span className="ml-2">{order.amount} {order.symbol}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <span className="ml-2">${order.price.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total:</span>
                <span className="ml-2">${order.total.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 capitalize">{order.type}</span>
              </div>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              {new Date(order.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
