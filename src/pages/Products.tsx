import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, Layers, Box, Scissors, FileText, 
  Download, MessageCircle, CheckCircle, ArrowRight 
} from 'lucide-react';

const Products = () => {
  const whatsappNumber = '919876543210';

  const products = [
    {
      icon: <Layers className="w-12 h-12" />,
      title: 'Mica Flakes',
      description: 'Premium quality mica flakes used in various industrial applications including paints, plastics, rubber, and construction materials.',
      features: [
        'High purity and quality',
        'Various size grades available',
        'Excellent thermal resistance',
        'Chemical inertness',
        'Wide industrial applications',
      ],
      applications: ['Paints & Coatings', 'Plastics Industry', 'Rubber Manufacturing', 'Construction Materials'],
    },
    {
      icon: <Package className="w-12 h-12" />,
      title: 'Mica Powder',
      description: 'Fine-grade mica powder manufactured with precision for use in cosmetics, paints, plastics, and electrical insulation.',
      features: [
        'Ultra-fine particle size',
        'Consistent quality',
        'Multiple mesh sizes',
        'Cosmetic grade available',
        'Industrial grade options',
      ],
      applications: ['Cosmetics', 'Paints & Varnishes', 'Plastic Industry', 'Electrical Insulation'],
    },
    {
      icon: <Box className="w-12 h-12" />,
      title: 'Mica Biotite',
      description: 'Natural mica biotite mineral products with excellent properties for specialized industrial applications.',
      features: [
        'Natural mineral quality',
        'High iron & magnesium content',
        'Dark coloration',
        'Excellent heat resistance',
        'Multiple processing options',
      ],
      applications: ['Drilling Fluids', 'Specialty Paints', 'Industrial Coatings', 'Filler Material'],
    },
    {
      icon: <Scissors className="w-12 h-12" />,
      title: 'Mica Blocks',
      description: 'Premium raw mica blocks suitable for manufacturing and further processing into various mica products.',
      features: [
        'High-grade raw material',
        'Consistent quality',
        'Various sizes available',
        'Excellent clarity',
        'Minimal inclusions',
      ],
      applications: ['Electronics Manufacturing', 'Capacitor Production', 'Insulation Products', 'Specialty Applications'],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Premium Quality
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Our <span className="text-secondary">Products</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Explore our range of premium mica products, manufactured with 
              precision and exported to industries worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted to-accent rounded-2xl flex items-center justify-center relative overflow-hidden group">
                    <div className="text-primary/20 group-hover:text-primary/30 transition-colors">
                      {product.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Product Details */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mb-6">
                    {product.icon}
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                    {product.title}
                  </h2>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-3">Applications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.title}. Please provide more details.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:-translate-y-0.5 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Inquiry
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-blue hover:-translate-y-0.5 transition-all"
                    >
                      Request Quote
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Quality Assurance
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Certified <span className="text-gradient-gold">Quality Standards</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              All our products meet international quality standards and come with 
              comprehensive test reports and certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'ISO 9001 Certified', description: 'Quality management system certification ensuring consistent quality' },
              { title: 'RoHS Compliant', description: 'Products free from hazardous substances for safe industrial use' },
              { title: 'Lab Tested', description: 'Every batch tested for quality parameters before shipment' },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/test-reports"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-blue hover:-translate-y-0.5 transition-all"
            >
              <FileText className="w-5 h-5" />
              View Test Reports
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Need Custom Specifications?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              We offer customized mica products to meet your specific industrial requirements.
            </p>
            <Link
              to="/contact"
              className="btn-hero-primary inline-flex"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
