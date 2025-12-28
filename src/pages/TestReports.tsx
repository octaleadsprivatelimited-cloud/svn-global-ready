import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Calendar, Search, 
  Award, Shield, CheckCircle, X, Eye 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TestReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReport, setSelectedReport] = useState<typeof testReports[0] | null>(null);

  const testReports = [
    {
      id: 1,
      title: 'Quartz Test Report June 2025',
      category: 'Quartz',
      date: 'June 2025',
      description: 'NABL Accredited test report for quartz lumps with comprehensive chemical analysis and quality parameters.',
      certifications: ['NABL Accredited', 'ISO Certified'],
      parameters: ['Chemical Analysis', 'Physical Properties', 'Quality Standards'],
    },
    {
      id: 2,
      title: 'Mica Covers Quality Report - May 2025',
      category: 'Mica',
      date: 'May 2025',
      description: 'Complete quality assurance report for electrical grade mica covers including dielectric strength and thermal properties.',
      certifications: ['ISO 9001', 'IEC Standards', 'RoHS Compliant'],
      parameters: ['Dielectric Strength', 'Thermal Resistance', 'Chemical Composition'],
    },
    {
      id: 3,
      title: 'Mica Sheets Export Certification - April 2025',
      category: 'Mica',
      date: 'April 2025',
      description: 'Export certification and quality test report for mica sheets meeting international export standards.',
      certifications: ['Export Quality', 'ISO Certified'],
      parameters: ['Thickness Tolerance', 'Surface Quality', 'Tensile Strength'],
    },
    {
      id: 4,
      title: 'Mica Flakes Analysis Report - March 2025',
      category: 'Mica',
      date: 'March 2025',
      description: 'Detailed particle size analysis and chemical composition report for premium mica flakes.',
      certifications: ['Lab Tested', 'Quality Assured'],
      parameters: ['Particle Size Distribution', 'Moisture Content', 'Purity Level'],
    },
    {
      id: 5,
      title: 'Mica Powder Grade Analysis - February 2025',
      category: 'Mica',
      date: 'February 2025',
      description: 'Comprehensive quality report for cosmetic and industrial grade mica powder.',
      certifications: ['Cosmetic Grade', 'Industrial Grade'],
      parameters: ['Mesh Size', 'Color Consistency', 'Heavy Metal Content'],
    },
    {
      id: 6,
      title: 'Feldspar Quality Report - January 2025',
      category: 'Feldspar',
      date: 'January 2025',
      description: 'Quality analysis report for feldspar products meeting ceramic industry standards.',
      certifications: ['ISO Certified', 'Quality Tested'],
      parameters: ['Alkali Content', 'Iron Content', 'Silica Percentage'],
    },
  ];

  const categories = ['All', ...Array.from(new Set(testReports.map(r => r.category)))];

  const filteredReports = testReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

      {/* Filter & Search */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-blue'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          {filteredReports.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Reports Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
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
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs font-medium text-foreground">
                        {report.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </div>

                    <h3 className="text-lg font-display font-semibold text-foreground mb-3 line-clamp-2">
                      {report.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {report.description}
                    </p>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {report.certifications.slice(0, 2).map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent text-accent-foreground rounded text-xs"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {cert}
                        </span>
                      ))}
                    </div>

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
                      <Button
                        size="sm"
                        className="flex-1 bg-primary text-primary-foreground"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
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
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground rounded text-xs font-medium mb-2">
                    {selectedReport.category}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    {selectedReport.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedReport.date}
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
                <p className="text-muted-foreground">
                  {selectedReport.description}
                </p>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Test Parameters</h4>
                  <ul className="space-y-2">
                    {selectedReport.parameters.map((param, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        {param}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border">
                <Button className="w-full bg-gradient-gold text-secondary-foreground shadow-gold">
                  <Download className="w-5 h-5 mr-2" />
                  Download Report
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestReports;
