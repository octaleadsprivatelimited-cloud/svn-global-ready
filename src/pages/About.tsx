import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Target, Eye, Heart, MapPin, Award, Globe, 
  TrendingUp, Users, Shield, Factory, ArrowRight 
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Commitment to delivering the highest quality mica products for global export markets.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'Transparent business practices and ethical standards in all export operations.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Continuous improvement in products and export processes to serve clients better.',
    },
  ];

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '24+', label: 'Export Countries' },
    { value: '500+', label: 'Global Clients' },
    { value: '100%', label: 'Quality Assured' },
  ];

  const products = [
    'Mica Blocks', 'Mica Flakes', 'Mica Powder', 'Mica Scrap', 
    'Mica Splittings', 'Mica Sheets', 'Mica Insulators', 
    'Mica Washers', 'Mica Strips', 'Art Craft Products'
  ];

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
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              About SVN Global
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              A leading manufacturer and exporter of premium quality mica products, 
              serving industries worldwide with excellence, integrity, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/mica-blocks.jpg"
                alt="SVN Global Factory"
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SVN Global is a leading manufacturer and exporter of premium quality mica products, 
                serving industries worldwide. We specialize in manufacturing and exporting a 
                comprehensive range of mica products.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our commitment to superior quality and adherence to international standards has made 
                us a trusted partner in the electronic industry. With our expert team and global 
                export network, we deliver excellence in every product.
              </p>
              
              <h4 className="font-semibold text-foreground mb-3">Our Products:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {products.map((product, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the world's most trusted exporter of mica products by delivering 
                exceptional quality, maintaining ethical business practices, and 
                building lasting partnerships with customers globally.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 rounded-lg shadow-md"
            >
              <div className="w-14 h-14 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the global leader in mica products export, recognized for 
                innovation, sustainability, and excellence, while contributing to 
                industrial growth worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Get in touch to discuss your mica product requirements
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:brightness-110 transition-all"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
