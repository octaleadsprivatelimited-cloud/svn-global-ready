import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, FileText, LogOut, Home, Shield, 
  TrendingUp, Users, Settings, Plus, Mail, Eye, Trash2, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface Stats {
  products: number;
  testReports: number;
  inquiries: number;
  unreadInquiries: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ products: 0, testReports: 0, inquiries: 0, unreadInquiries: 0 });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/admin');
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      // Fetch counts
      const [productsRes, reportsRes, inquiriesRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('test_reports').select('id', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('*').order('created_at', { ascending: false }),
      ]);

      const unreadCount = inquiriesRes.data?.filter(i => !i.is_read).length || 0;

      setStats({
        products: productsRes.count || 0,
        testReports: reportsRes.count || 0,
        inquiries: inquiriesRes.data?.length || 0,
        unreadInquiries: unreadCount,
      });

      setInquiries(inquiriesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/admin');
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
      setStats(prev => ({ ...prev, unreadInquiries: prev.unreadInquiries - 1 }));
    }
  };

  const deleteInquiry = async (id: string) => {
    const inquiry = inquiries.find(i => i.id === id);
    const { error } = await supabase
      .from('contact_inquiries')
      .delete()
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.filter(i => i.id !== id));
      setStats(prev => ({
        ...prev,
        inquiries: prev.inquiries - 1,
        unreadInquiries: inquiry && !inquiry.is_read ? prev.unreadInquiries - 1 : prev.unreadInquiries,
      }));
      toast({
        title: "Deleted",
        description: "Inquiry has been deleted.",
      });
    }
  };

  const statsCards = [
    { label: 'Total Products', value: stats.products.toString(), icon: <Package className="w-6 h-6" />, color: 'bg-primary' },
    { label: 'Test Reports', value: stats.testReports.toString(), icon: <FileText className="w-6 h-6" />, color: 'bg-secondary' },
    { label: 'Total Inquiries', value: stats.inquiries.toString(), icon: <Users className="w-6 h-6" />, color: 'bg-accent-foreground' },
    { label: 'Unread', value: stats.unreadInquiries.toString(), icon: <Mail className="w-6 h-6" />, color: 'bg-destructive' },
  ];

  const quickActions = [
    { label: 'Manage Products', icon: <Package className="w-5 h-5" />, href: '/admin/products', action: 'add' },
    { label: 'Manage Test Reports', icon: <FileText className="w-5 h-5" />, href: '/admin/test-reports', action: 'add' },
    { label: 'View Website', icon: <Home className="w-5 h-5" />, href: '/', external: true },
  ];

  if (authLoading || loadingData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
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
                <p className="text-primary-foreground/70">Welcome back, {user.email}</p>
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
          {statsCards.map((stat, index) => (
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

          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 card-elevated p-6"
          >
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Recent Contact Inquiries
            </h2>
            
            {inquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {inquiries.slice(0, 10).map((inquiry) => (
                  <div 
                    key={inquiry.id} 
                    className={`p-4 rounded-lg border ${inquiry.is_read ? 'bg-muted/50' : 'bg-primary/5 border-primary/20'}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{inquiry.name}</h4>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!inquiry.is_read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(inquiry.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{inquiry.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
