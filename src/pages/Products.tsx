import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRight, MessageCircle, CheckCircle } from 'lucide-react';

const Products = () => {
  const products = [
    {
      image: '/mica-biotite.jpg',
      title: 'Black Ayurvedic Medicine Mica Biotite',
      specs: [
        { label: 'Place of Origin', value: 'India' },
        { label: 'K2O Content (%)', value: '9-11%' },
        { label: 'Material', value: 'Mica' },
        { label: 'Quality', value: 'Superior' },
        { label: 'Purity', value: '99%' },
      ],
    },
    {
      image: '/mica-flakes.jpg',
      title: 'Mica Scrap',
      specs: [
        { label: 'Application', value: 'Industrial Use' },
        { label: 'Feature', value: 'Adhesive, Anti Cut, Light Weight' },
        { label: 'Width', value: '100-500mm' },
        { label: 'Temperature', value: '10°C, 20°C, 30°C' },
        { label: 'Min Order', value: '20 Ft. Container' },
      ],
    },
    {
      image: '/mica-powder.jpg',
      title: 'Amber Mica Sheets',
      specs: [
        { label: 'Material', value: 'Mica' },
        { label: 'Thickness', value: '1mm, 2mm, 3mm, 4mm' },
        { label: 'Application', value: 'Muscovite' },
        { label: 'Color', value: 'Yellow' },
        { label: 'Feature', value: 'Water Repellent, Light Weight' },
      ],
    },
    {
      image: '/mica-blocks.jpg',
      title: 'Mica Blocks',
      specs: [
        { label: 'Material', value: 'Natural Mica' },
        { label: 'Grade', value: 'Export Quality' },
        { label: 'Size', value: 'As per requirement' },
        { label: 'Application', value: 'Electronics, Insulation' },
        { label: 'Purity', value: '98%+' },
      ],
    },
    {
      image: '/mica-flakes.jpg',
      title: 'Mica Flakes',
      specs: [
        { label: 'Type', value: 'Natural Mica Flakes' },
        { label: 'Size', value: 'Various grades available' },
        { label: 'Application', value: 'Paints, Plastics, Rubber' },
        { label: 'Feature', value: 'High thermal resistance' },
        { label: 'Purity', value: '99%' },
      ],
    },
    {
      image: '/mica-powder.jpg',
      title: 'Mica Powder',
      specs: [
        { label: 'Mesh Size', value: '100-600 mesh' },
        { label: 'Type', value: 'Wet/Dry Ground' },
        { label: 'Application', value: 'Cosmetics, Paints' },
        { label: 'Color', value: 'Silver White' },
        { label: 'Grade', value: 'Cosmetic/Industrial' },
      ],
    },
  ];

  const whatsappNumber = '919876543210';

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Products
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Premium Mica Products
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Explore our comprehensive range of high-quality mica products 
              manufactured for global industrial applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {product.title}
                  </h3>
                  <div className="space-y-2 mb-5">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex text-sm">
                        <span className="text-muted-foreground w-28 flex-shrink-0">
                          {spec.label}:
                        </span>
                        <span className="text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to="/contact"
                      className="flex-1 py-2 bg-secondary text-secondary-foreground text-center text-sm font-semibold rounded-md hover:brightness-110 transition-all"
                    >
                      Enquiry Now
                    </Link>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-[#25D366] text-white text-center text-sm font-semibold rounded-md hover:brightness-110 transition-all flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Quality Assurance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Certified Quality Standards
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              All our products meet international quality standards and come with 
              comprehensive test reports and certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'ISO 9001 Certified', desc: 'Quality management system' },
              { title: 'NABL Accredited', desc: 'Laboratory testing standards' },
              { title: 'RoHS Compliant', desc: 'Hazardous substance free' },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted p-6 rounded-lg text-center"
              >
                <CheckCircle className="w-10 h-10 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/test-reports"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all"
            >
              View Test Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Custom Specifications?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            We offer customized mica products to meet your specific requirements
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:brightness-110 transition-all"
          >
            Request Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Products;
