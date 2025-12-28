import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Award, Shield, Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/test-reports', label: 'Test Reports' },
    { path: '/contact', label: 'Contact' },
  ];

  const services = [
    'Mica Covers Import',
    'Mica Covers Export',
    'Custom Manufacturing',
    'Quality Assurance',
    'Global Shipping',
    'Compliance Services',
  ];

  const certifications = [
    { icon: <Award className="w-5 h-5" />, text: 'ISO Certified' },
    { icon: <Shield className="w-5 h-5" />, text: 'RoHS Compliant' },
    { icon: <Globe className="w-5 h-5" />, text: 'Global Standards' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center shadow-gold">
                  <span className="text-secondary-foreground font-display font-bold text-xl">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold">SVN Global</h3>
                  <p className="text-sm text-primary-foreground/70">Mica Covers Export</p>
                </div>
              </Link>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Leading exporter of premium quality mica covers and products. Committed to excellence 
                in quality and service for over a decade.
              </p>
              {/* Certifications */}
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary-foreground/10 rounded-full text-sm"
                  >
                    {cert.icon}
                    <span>{cert.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-secondary" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-secondary" />
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-primary-foreground/80">
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-secondary" />
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80">
                    123 Export Zone, Industrial Area<br />
                    Jharkhand, India - 834001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                  <a href="mailto:info@svnglobal.com" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                    info@svnglobal.com
                  </a>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © {currentYear} SVN Global. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <Link to="/privacy" className="hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
