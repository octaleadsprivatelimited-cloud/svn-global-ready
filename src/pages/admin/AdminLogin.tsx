import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSetupMode, setIsSetupMode] = useState(false);
  const [hasAdmins, setHasAdmins] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signIn, signUp } = useAuth();

  useEffect(() => {
    checkForAdmins();
  }, []);

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [user, isAdmin, authLoading, navigate]);

  const checkForAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (error) {
        console.error('Error checking for admins:', error);
        return;
      }

      setHasAdmins(data && data.length > 0);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isSetupMode) {
      // First admin signup
      const { error: signUpError } = await signUp(email, password);

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Sign in the new user
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // Get the current user
      const { data: { user: newUser } } = await supabase.auth.getUser();
      
      if (newUser) {
        // Assign admin role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: newUser.id, role: 'admin' });

        if (roleError) {
          console.error('Error assigning admin role:', roleError);
          setError('Account created but failed to assign admin role. Please contact support.');
          setLoading(false);
          return;
        }
      }

      toast({
        title: "Admin Account Created",
        description: "Welcome to SVN Global Admin Panel",
      });

      // Force refresh to update admin status
      window.location.href = '/admin/dashboard';
      return;
    }

    // Regular login
    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      if (signInError.message.includes('Invalid login credentials')) {
        setError('Invalid email or password');
      } else {
        setError(signInError.message);
      }
      setLoading(false);
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to SVN Global Admin Panel",
    });
    
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-muted to-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="card-elevated p-8">
          {/* Back to Home */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4 shadow-blue">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {isSetupMode ? 'Create Admin Account' : 'Admin Login'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isSetupMode 
                ? 'Set up your first admin account' 
                : 'Access the SVN Global admin panel'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@svnglobal.com"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSetupMode ? 'Create a strong password' : 'Enter password'}
                  className="pl-10 pr-10 h-12"
                  required
                  minLength={isSetupMode ? 8 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSetupMode && (
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-gold text-secondary-foreground font-semibold shadow-gold hover:-translate-y-0.5 transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  {isSetupMode ? 'Creating account...' : 'Logging in...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSetupMode ? <UserPlus className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  {isSetupMode ? 'Create Admin Account' : 'Login'}
                </span>
              )}
            </Button>
          </form>

          {/* Toggle Setup Mode */}
          {!hasAdmins && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsSetupMode(!isSetupMode)}
                className="text-sm text-primary hover:underline"
              >
                {isSetupMode 
                  ? 'Already have an account? Login' 
                  : 'First time? Create admin account'}
              </button>
            </div>
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {!hasAdmins 
                ? 'No admin account found. Create your first admin account to get started.'
                : 'Contact system administrator to get admin access credentials.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;