import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, ArrowLeft, Plus, Edit, Trash2, Save, Upload, X, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TestReport {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  is_public: boolean;
  created_at: string;
}

const AdminTestReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [reports, setReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<TestReport | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_public: true,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/admin');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchReports();
    }
  }, [user, isAdmin]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('test_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching test reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddDialog = () => {
    setEditingReport(null);
    setFormData({ title: '', description: '', is_public: true });
    setPdfFile(null);
    setPdfFileName(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (report: TestReport) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      description: report.description || '',
      is_public: report.is_public,
    });
    setPdfFile(null);
    setPdfFileName(report.file_url ? 'Current file' : null);
    setIsDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({ title: "Error", description: "Please select a PDF file", variant: "destructive" });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({ title: "Error", description: "File size must be less than 10MB", variant: "destructive" });
        return;
      }
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  const uploadPdf = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('test-reports')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('test-reports')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Report title is required", variant: "destructive" });
      return;
    }

    setSaving(true);

    try {
      let fileUrl = editingReport?.file_url || null;

      if (pdfFile) {
        setUploading(true);
        fileUrl = await uploadPdf(pdfFile);
        setUploading(false);
      }

      if (editingReport) {
        const { error } = await supabase
          .from('test_reports')
          .update({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            file_url: fileUrl,
            is_public: formData.is_public,
          })
          .eq('id', editingReport.id);

        if (error) throw error;
        toast({ title: "Success", description: "Test report updated successfully" });
      } else {
        const { error } = await supabase
          .from('test_reports')
          .insert({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            file_url: fileUrl,
            is_public: formData.is_public,
          });

        if (error) throw error;
        toast({ title: "Success", description: "Test report added successfully" });
      }

      setIsDialogOpen(false);
      fetchReports();
    } catch (error) {
      console.error('Error saving test report:', error);
      toast({ title: "Error", description: "Failed to save test report", variant: "destructive" });
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this test report?')) return;

    try {
      const { error } = await supabase.from('test_reports').delete().eq('id', id);
      if (error) throw error;
      setReports(prev => prev.filter(r => r.id !== id));
      toast({ title: "Deleted", description: "Test report deleted successfully" });
    } catch (error) {
      console.error('Error deleting test report:', error);
      toast({ title: "Error", description: "Failed to delete test report", variant: "destructive" });
    }
  };

  const removeFile = () => {
    setPdfFile(null);
    setPdfFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen pt-20 bg-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard" className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">Test Reports</h1>
                <p className="text-primary-foreground/70">Manage quality test reports and certifications</p>
              </div>
            </div>
            <Button onClick={openAddDialog} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-8">
        {reports.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Test Reports Yet</h3>
            <p className="text-muted-foreground mb-4">Start by adding your first test report</p>
            <Button onClick={openAddDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Report
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-elevated p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{report.title}</h3>
                      {report.description && (
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${report.is_public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {report.is_public ? 'Public' : 'Private'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                        {report.file_url && (
                          <a 
                            href={report.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            View PDF <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(report)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(report.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingReport ? 'Edit Test Report' : 'Add New Test Report'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Report Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter report title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload PDF</label>
              {pdfFileName ? (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{pdfFileName}</p>
                    <p className="text-xs text-muted-foreground">
                      {pdfFile ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB` : 'Existing file'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload PDF</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF up to 10MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Report description..."
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_public"
                checked={formData.is_public}
                onChange={(e) => setFormData(prev => ({ ...prev, is_public: e.target.checked }))}
                className="rounded border-input"
              />
              <label htmlFor="is_public" className="text-sm">Public (visible on website)</label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || uploading} className="flex-1">
                {uploading ? 'Uploading...' : saving ? 'Saving...' : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingReport ? 'Update' : 'Add Report'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestReports;
