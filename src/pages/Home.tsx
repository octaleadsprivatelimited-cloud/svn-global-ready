import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Globe, Award, 
  Truck, Shield, ArrowRight 
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      image: '/mica-flakes.jpg',
      title: 'Mica Flakes',
      subtitle: 'Premium Quality for Industrial Applications',
    },
    {
      image: '/mica-powder.jpg',
      title: 'Mica Powder',
      subtitle: 'Ultra-Fine Grade for Multiple Industries',
    },
    {
      image: '/mica-biotite.jpg',
      title: 'Mica Biotite',
      subtitle: 'Natural Mineral Excellence',
    },
    {
      image: '/mica-blocks.jpg',
      title: 'Mica Blocks',
      subtitle: 'Premium Raw Material for Manufacturing',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const hotProducts = [
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
  ];

  const whyChooseUs = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Reach',
      description: 'Exporting to 24+ countries with reliable shipping and logistics support',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'ISO certified, NABL accredited products meeting international standards',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Efficient logistics ensuring timely delivery to your location',
    },
  ];

  const stats = [
    { value: '100%', label: 'ISO Certified' },
    { value: '24+', label: 'Quality Assured' },
    { value: '10+', label: 'Export Countries' },
    { value: '24/7', label: 'Years Experience' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Carousel */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-white/90">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? 'w-8 bg-secondary' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/mica-blocks.jpg"
                alt="SVN Global Mica Products"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Unmatched Quality Mica Products!
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SVN Global is a leading manufacturer and exporter of premium quality mica products, 
                serving industries worldwide. We specialize in manufacturing and exporting a 
                comprehensive range of mica products including Mica Blocks, Flakes, Powder, Scrap, 
                Splittings, Sheets, Insulators, Washers, Strips, and products for Art Craft.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our commitment to superior quality and adherence to international standards has made 
                us a trusted partner in the electronic industry. With our expert team and global 
                export network, we deliver excellence in every product we manufacture and export.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Hot Products
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
                        <span className="text-muted-foreground w-32 flex-shrink-0">
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
                    <Link
                      to="/products"
                      className="flex-1 py-2 border border-primary text-primary text-center text-sm font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:brightness-110 transition-all"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Why Choose SVN Global?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Leading exporter of premium mica covers with unmatched quality and service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                <Link
                  to="/about"
                  className="inline-block mt-4 text-primary text-sm font-medium hover:underline"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Export Premium Mica Covers?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Get in touch with us for competitive pricing and export solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:brightness-110 transition-all"
            >
              Request Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all"
            >
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
