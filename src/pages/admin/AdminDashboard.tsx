import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, FileText, LogOut, Home, Shield, 
  TrendingUp, Users, Settings, Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const auth = localStorage.getItem('svn_admin_auth');
    const user = localStorage.getItem('svn_admin_user');
    
    if (auth === 'true' && user) {
      setIsAuthenticated(true);
      setUsername(user);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('svn_admin_auth');
    localStorage.removeItem('svn_admin_user');
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    
    navigate('/admin');
  };

  const stats = [
    { label: 'Total Products', value: '12', icon: <Package className="w-6 h-6" />, color: 'bg-primary' },
    { label: 'Test Reports', value: '8', icon: <FileText className="w-6 h-6" />, color: 'bg-secondary' },
    { label: 'Monthly Views', value: '2.4K', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-accent-foreground' },
    { label: 'Inquiries', value: '45', icon: <Users className="w-6 h-6" />, color: 'bg-destructive' },
  ];

  const quickActions = [
    { label: 'Add Product', icon: <Package className="w-5 h-5" />, href: '/admin/products', action: 'add' },
    { label: 'Add Test Report', icon: <FileText className="w-5 h-5" />, href: '/admin/test-reports', action: 'add' },
    { label: 'View Website', icon: <Home className="w-5 h-5" />, href: '/', external: true },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, href: '#' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-muted">
      {/* Admin Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
                <p className="text-primary-foreground/70">Welcome back, {username}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-elevated p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} text-primary-foreground flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-elevated p-6"
          >
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  target={action.external ? '_blank' : undefined}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-accent transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary">
                    {action.icon}
                  </div>
                  <span className="font-medium text-foreground">{action.label}</span>
                  {action.action === 'add' && (
                    <Plus className="w-4 h-4 ml-auto text-muted-foreground" />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 card-elevated p-6"
          >
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Management Sections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/admin/products"
                className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 hover:border-primary/30 transition-all group"
              >
                <Package className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Product Management</h3>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and manage all mica products
                </p>
              </Link>

              <Link
                to="/admin/test-reports"
                className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/10 hover:border-secondary/30 transition-all group"
              >
                <FileText className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Test Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Manage quality test reports and certifications
                </p>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Backend Integration Note</h3>
              <p className="text-sm text-muted-foreground">
                This admin panel is currently using local storage for demo purposes. 
                For full backend functionality with MongoDB and secure authentication, 
                connect to Lovable Cloud (Supabase) for a production-ready solution.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
