import { motion } from 'framer-motion';
import { 
  Target, Eye, Heart, MapPin, Award, Globe, 
  TrendingUp, Users, Shield, CheckCircle, Factory, Calendar 
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

  const exportRegions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Middle East',
    'Africa',
    'South America',
  ];

  const achievements = [
    { number: '10+', label: 'Years Exporting', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '24+', label: 'Export Countries', icon: <Globe className="w-6 h-6" /> },
    { number: '500+', label: 'Global Clients', icon: <Users className="w-6 h-6" /> },
    { number: '100%', label: 'Quality Assured', icon: <Shield className="w-6 h-6" /> },
  ];

  const timeline = [
    { year: '2013', title: 'Company Founded', description: 'Started operations in mica mining and processing' },
    { year: '2015', title: 'First Export', description: 'Expanded to international markets with first export shipment' },
    { year: '2018', title: 'ISO Certification', description: 'Achieved ISO 9001 quality management certification' },
    { year: '2020', title: 'Global Expansion', description: 'Reached 20+ countries with consistent quality supply' },
    { year: '2023', title: '10 Years Strong', description: 'Celebrated a decade of export excellence' },
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
              <Factory className="w-4 h-4" />
              Est. 2013
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              About <span className="text-secondary">SVN Global</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              A leading exporter of premium quality mica covers and products, 
              serving industries worldwide with excellence, integrity, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
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

      {/* Our Story */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                A Legacy of <span className="text-gradient-gold">Excellence</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2013, SVN Global has grown from a local mica processing unit 
                  to a leading international exporter of premium mica products.
                </p>
                <p>
                  Our journey began with a simple vision: to provide the world with the 
                  finest quality mica covers while maintaining the highest standards of 
                  business ethics and environmental responsibility.
                </p>
                <p>
                  Today, we proudly serve customers across 24+ countries, delivering 
                  consistent quality, reliable service, and innovative solutions for 
                  diverse industrial applications.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <Factory className="w-32 h-32 text-primary/30" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
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
              className="card-elevated p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
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
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              What <span className="text-gradient-gold">Drives Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated p-8 text-center group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
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

      {/* Timeline */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Milestones & <span className="text-gradient-gold">Achievements</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary -translate-x-1/2 ring-4 ring-background" />
                
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 text-primary font-display font-bold">
                    <Calendar className="w-4 h-4" />
                    {item.year}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mt-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground mt-1">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <Globe className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Global <span className="text-secondary">Presence</span>
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Serving customers across continents with reliable export services
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {exportRegions.map((region, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-foreground/10 rounded-lg backdrop-blur-sm"
              >
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">{region}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
