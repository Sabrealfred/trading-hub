
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Balance {
  currency: string;
  amount: number;
  value_usd: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  currency: string;
  amount: number;
  timestamp: string;
  status: 'completed' | 'pending';
}

// Temporary mock data - replace with real API calls later
const mockBalances: Balance[] = [
  { currency: 'BTC', amount: 0.5, value_usd: 21500 },
  { currency: 'ETH', amount: 4.2, value_usd: 8400 },
  { currency: 'USDT', amount: 5000, value_usd: 5000 },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    currency: 'BTC',
    amount: 0.1,
    timestamp: '2024-02-20T10:00:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'withdrawal',
    currency: 'ETH',
    amount: 1.5,
    timestamp: '2024-02-19T15:30:00Z',
    status: 'completed'
  },
];

const BalancesCard = () => {
  const { data: balances, isLoading: isBalancesLoading } = useQuery({
    queryKey: ['balances'],
    queryFn: () => Promise.resolve(mockBalances),
    refetchInterval: 30000,
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => Promise.resolve(mockTransactions),
    refetchInterval: 30000,
  });

  const totalValueUSD = balances?.reduce((sum, balance) => sum + balance.value_usd, 0) || 0;

  if (isBalancesLoading || isTransactionsLoading) {
    return (
      <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
        <div className="w-full h-[200px] flex items-center justify-center">
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Account Balance</h2>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-muted-foreground" />
          <span className="text-xl font-semibold">${totalValueUSD.toLocaleString()}</span>
        </div>
      </div>

      {/* Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {balances?.map((balance) => (
          <div key={balance.currency} className="p-4 rounded-lg bg-secondary/20 border border-secondary/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">{balance.currency}</span>
              <span className="text-sm text-muted-foreground">${balance.value_usd.toLocaleString()}</span>
            </div>
            <span className="text-lg font-semibold">{balance.amount}</span>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions?.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center gap-3">
                {tx.type === 'deposit' ? (
                  <ArrowDownRight className="w-5 h-5 text-green-500" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium">{tx.type === 'deposit' ? 'Deposit' : 'Withdrawal'}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{tx.amount} {tx.currency}</p>
                <p className="text-sm text-muted-foreground">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalancesCard;
