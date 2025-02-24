
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Trash2 } from "lucide-react";

interface PriceAlert {
  id: string;
  symbol: string;
  price: number;
  condition: 'above' | 'below';
  active: boolean;
}

const PriceAlerts = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      symbol: 'BTC',
      price: 50000,
      condition: 'above',
      active: true,
    },
    {
      id: '2',
      symbol: 'ETH',
      price: 3000,
      condition: 'below',
      active: true,
    },
  ]);

  const [newAlert, setNewAlert] = useState({
    symbol: 'BTC',
    price: '',
    condition: 'above' as const,
  });

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.price) return;

    const alert: PriceAlert = {
      id: Date.now().toString(),
      symbol: newAlert.symbol,
      price: Number(newAlert.price),
      condition: newAlert.condition,
      active: true,
    };

    setAlerts(prev => [...prev, alert]);
    setNewAlert(prev => ({ ...prev, price: '' }));
    
    toast({
      title: "Alert Created",
      description: `You will be notified when ${newAlert.symbol} goes ${newAlert.condition} $${newAlert.price}`,
    });
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "The price alert has been removed.",
    });
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <div className="glass-card p-6 rounded-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Price Alerts</h2>
        <Bell className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Create New Alert */}
      <form onSubmit={handleAddAlert} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newAlert.symbol}
            onChange={(e) => setNewAlert(prev => ({ ...prev, symbol: e.target.value }))}
            className="bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2"
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="XRP">Ripple (XRP)</option>
          </select>

          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert(prev => ({ 
              ...prev, 
              condition: e.target.value as 'above' | 'below'
            }))}
            className="bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2"
          >
            <option value="above">Goes Above</option>
            <option value="below">Goes Below</option>
          </select>

          <input
            type="number"
            value={newAlert.price}
            onChange={(e) => setNewAlert(prev => ({ ...prev, price: e.target.value }))}
            placeholder="Price in USD"
            className="bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            Create Alert
          </button>
        </div>
      </form>

      {/* Active Alerts */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleAlert(alert.id)}
                className={`w-3 h-3 rounded-full ${
                  alert.active ? 'bg-success' : 'bg-warning'
                }`}
              />
              <div>
                <p className="font-medium">
                  {alert.symbol} {alert.condition} ${alert.price.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: {alert.active ? 'Active' : 'Paused'}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteAlert(alert.id)}
              className="p-2 hover:bg-secondary/20 rounded-lg"
            >
              <Trash2 className="w-4 h-4 text-warning" />
            </button>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No price alerts set. Create one above!
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAlerts;
