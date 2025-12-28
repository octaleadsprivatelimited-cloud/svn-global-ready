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

  const products = [
    'Mica Blocks',
    'Mica Flakes',
    'Mica Powder',
    'Mica Scrap',
    'Mica Sheets',
    'Mica Insulators',
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="SVN Global Logo"
                  className="h-10 w-auto brightness-0 invert"
                />
                <div>
                  <h3 className="text-lg font-bold">SVN Global</h3>
                  <p className="text-xs text-secondary uppercase tracking-wider">MICA COVERS</p>
                </div>
              </Link>
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
                Leading manufacturer and exporter of premium quality mica products, 
                serving industries worldwide with excellence.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-md bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-md bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-md bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Our Products</h4>
              <ul className="space-y-2">
                {products.map((product, index) => (
                  <li key={index}>
                    <Link
                      to="/products"
                      className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors"
                    >
                      {product}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-sm">
                    123 Export Zone, Industrial Area<br />
                    Jharkhand, India - 834001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                  <a 
                    href="tel:+919876543210" 
                    className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                  <a 
                    href="mailto:info@svnglobal.com"
                    className="text-primary-foreground/80 text-sm hover:text-secondary transition-colors"
                  >
                    info@svnglobal.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {currentYear} SVN Global. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
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
