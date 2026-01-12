import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Calendar, Search, 
  Award, Shield, CheckCircle, X, Eye, Loader2 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface TestReport {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  is_public: boolean;
  created_at: string;
}

const TestReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<TestReport | null>(null);
  const [reports, setReports] = useState<TestReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('test_reports')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching test reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (report: TestReport) => {
    if (report.file_url) {
      window.open(report.file_url, '_blank');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-24 text-primary-foreground overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(26, 54, 93, 0.92), rgba(26, 54, 93, 0.75)), url('/mica-powder.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Quality Assurance
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Test <span className="text-secondary">Reports</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              View our comprehensive test reports and quality certifications. 
              All products are tested and certified to international standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: <Award className="w-6 h-6" />, label: 'NABL Accredited' },
              { icon: <Shield className="w-6 h-6" />, label: 'ISO 9001 Certified' },
              { icon: <CheckCircle className="w-6 h-6" />, label: 'RoHS Compliant' },
            ].map((cert, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <div className="text-secondary">{cert.icon}</div>
                <span className="font-medium">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Reports Found</h3>
              <p className="text-muted-foreground">
                {reports.length === 0 
                  ? "No test reports have been published yet." 
                  : "Try adjusting your search criteria."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-elevated overflow-hidden group hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
                    <FileText className="w-12 h-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    {report.file_url && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          PDF Available
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(report.created_at)}
                    </div>

                    <h3 className="text-lg font-display font-semibold text-foreground mb-3 line-clamp-2">
                      {report.title}
                    </h3>

                    {report.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {report.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      {report.file_url && (
                        <Button
                          size="sm"
                          className="flex-1 bg-primary text-primary-foreground"
                          onClick={() => handleDownload(report)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Report Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-border flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {selectedReport.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(selectedReport.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {selectedReport.description ? (
                  <p className="text-muted-foreground">
                    {selectedReport.description}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic">
                    No description available for this report.
                  </p>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">Quality Certified Report</span>
                </div>
              </div>

              {/* Modal Footer */}
              {selectedReport.file_url && (
                <div className="p-6 border-t border-border">
                  <Button 
                    className="w-full bg-gradient-gold text-secondary-foreground shadow-gold"
                    onClick={() => handleDownload(selectedReport)}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Report
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestReports;