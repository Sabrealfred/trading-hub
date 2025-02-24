
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import BalancesCard from "@/components/BalancesCard";
import TradingForm from "@/components/TradingForm";
import OrderBook from "@/components/OrderBook";
import OrderHistory from "@/components/OrderHistory";
import PriceAlerts from "@/components/PriceAlerts";
import { Bell, Settings, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="p-6 border-b border-secondary/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Crypto Trading Hub
              </h1>
              <p className="text-sm text-muted-foreground">
                BTC/USDT • Last Price: $48,235.65 • 24h Change: +2.4%
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="w-64 pl-10 pr-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-secondary/20 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="hidden md:block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Your Balance</p>
              <p className="text-lg font-semibold">$24,521.43</p>
              <span className="text-xs text-success">+5.2% (24h)</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Open Orders</p>
              <p className="text-lg font-semibold">3 Active</p>
              <span className="text-xs text-muted-foreground">$12,435 Total</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Price Alerts</p>
              <p className="text-lg font-semibold">2 Active</p>
              <span className="text-xs text-primary">View All</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">24h Volume</p>
              <p className="text-lg font-semibold">$84.2B</p>
              <span className="text-xs text-success">+5.1% (24h)</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
              <p className="text-lg font-semibold">$2.1T</p>
              <span className="text-xs text-success">+2.4% (24h)</span>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">BTC Dominance</p>
              <p className="text-lg font-semibold">42.1%</p>
              <span className="text-xs text-warning">-0.8% (24h)</span>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CryptoChart />
            </div>
            <div>
              <PortfolioCard />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div>
              <OrderBook />
            </div>
            <div>
              <BalancesCard />
            </div>
            <div>
              <TradingForm />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <OrderHistory />
            <PriceAlerts />
          </div>
          
          <CryptoList />
        </main>
      </div>
    </div>
  );
};

export default Index;
