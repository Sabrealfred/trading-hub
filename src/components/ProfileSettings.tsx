
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Lock, Moon, Sun, User } from "lucide-react";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [notifications, setNotifications] = useState(true);

  // Mock user data - replace with real data later
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    twoFactorEnabled: false
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleToggle2FA = () => {
    toast({
      title: "2FA Status Changed",
      description: `Two-factor authentication has been ${userData.twoFactorEnabled ? 'disabled' : 'enabled'}.`,
    });
    setUserData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Profile Information</h2>
          </div>
          
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-secondary/10 border border-secondary/20 rounded-lg px-4 py-2"
              />
            </div>
            
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
            <div>
              <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              onClick={handleToggle2FA}
              className={`px-4 py-2 rounded-lg ${
                userData.twoFactorEnabled
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-success text-success-foreground'
              }`}
            >
              {userData.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* Platform Preferences */}
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Platform Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <button
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-secondary/20"
              >
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
              <div>
                <h3 className="font-medium">Data Refresh Interval</h3>
                <p className="text-sm text-muted-foreground">
                  How often should we update market data
                </p>
              </div>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                className="bg-secondary/20 border border-secondary/30 rounded-lg px-3 py-1"
              >
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
              <div>
                <h3 className="font-medium">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for price changes
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => !prev)}
                className={`px-4 py-2 rounded-lg ${
                  notifications
                    ? 'bg-success text-success-foreground'
                    : 'bg-secondary/20'
                }`}
              >
                {notifications ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
