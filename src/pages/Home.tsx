import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ChevronLeft, ChevronRight, Globe, Award, 
  Truck, Shield, CheckCircle, Zap, Package, Factory, Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: 'Premium Mica Flakes',
      subtitle: 'High-quality mica flakes for industrial applications',
      gradient: 'from-primary via-primary to-royal-dark',
    },
    {
      title: 'Fine Mica Powder',
      subtitle: 'Ultra-fine grade for multiple industries',
      gradient: 'from-royal-dark via-primary to-primary',
    },
    {
      title: 'Natural Mica Biotite',
      subtitle: 'Premium natural mineral excellence',
      gradient: 'from-primary to-royal-dark',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const stats = [
    { number: '10+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
    { number: '24+', label: 'Export Countries', icon: <Globe className="w-6 h-6" /> },
    { number: '500+', label: 'Global Clients', icon: <Users className="w-6 h-6" /> },
    { number: '100%', label: 'Quality Assured', icon: <Shield className="w-6 h-6" /> },
  ];

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Highest grade mica products meeting international standards for quality and consistency.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Export',
      description: 'Reliable shipping to 24+ countries with comprehensive export documentation.',
    },
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Custom Manufacturing',
      description: 'Tailored solutions to meet specific industrial requirements and specifications.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Certified',
      description: 'ISO certified processes ensuring consistent quality and compliance.',
    },
  ];

  const products = [
    { name: 'Mica Flakes', description: 'Premium quality for industrial applications' },
    { name: 'Mica Powder', description: 'Ultra-fine grade for multiple industries' },
    { name: 'Mica Biotite', description: 'Natural mineral for various uses' },
    { name: 'Mica Blocks', description: 'Raw material for manufacturing' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full text-secondary text-sm font-medium mb-8">
                <Award className="w-4 h-4" />
                ISO Certified Quality Standards
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-primary-foreground/80 mb-4">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-10"
            >
              Leading exporter of premium mica covers and products. 
              Trusted by industries worldwide for quality, reliability, and excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/products"
                className="btn-hero-primary group"
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="btn-hero-outline"
              >
                Request Quote
              </Link>
            </motion.div>

            {/* Carousel Indicators */}
            <div className="flex items-center justify-center gap-2 mt-12">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-secondary' 
                      : 'bg-primary-foreground/30 hover:bg-primary-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-secondary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary text-primary-foreground mb-4 shadow-blue">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Excellence in Every <span className="text-gradient-gold">Export</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Over a decade of experience in mica products manufacturing and export, 
              serving industries worldwide with uncompromising quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated p-6 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Our Products
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Premium <span className="text-gradient-gold">Mica Products</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              High-quality mica covers and products for global industrial applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Package className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {product.description}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg shadow-blue hover:-translate-y-0.5 transition-all duration-200"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Source Premium Mica Products?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Get in touch with our team for competitive pricing, 
              quality assurance, and reliable global shipping.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="btn-hero-primary"
              >
                Request Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:info@svnglobal.com"
                className="btn-hero-outline"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
