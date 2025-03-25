
import React from 'react';
import { motion } from 'framer-motion';

const CultureGallery = () => {
  const images = [
    {
      src: '/lovable-uploads/4754ff98-e28b-4ad9-8d88-b41d7b2e8fa3.png',
      alt: 'Tea garden workers in Assam harvesting tea leaves',
      title: 'Tea Plantation'
    },
    {
      src: '/lovable-uploads/adeb94dd-21aa-4bd6-8b5a-13b5517f6e20.png',
      alt: 'Tea garden workers with traditional baskets',
      title: 'Tea Harvesting'
    },
    {
      src: '/lovable-uploads/e5815e41-b456-4a8a-b1b0-9ad3421aecdb.png',
      alt: 'Bihu dancers performing traditional Assamese dance',
      title: 'Bihu Dance'
    },
    {
      src: '/lovable-uploads/1c0d8c15-052d-4254-8a4a-2bf8d1227ee2.png',
      alt: 'Bihu dancers performing traditional Assamese dance',
      title: 'Bihu Dance'
    },
    {
      src: '/lovable-uploads/710749ad-8729-4582-8222-e7010d0a9c62.png',
      alt: 'Tea garden workers in Assam',
      title: 'Tea Garden'
    },
    {
      src: '/lovable-uploads/a74eaee1-3f55-479e-ba58-5f00b6114fdb.png',
      alt: 'Monks performing Sattriya dance',
      title: 'Sattriya Dance'
    },
    {
      src: '/lovable-uploads/d3856a5f-6afa-4981-b97a-76f1ffeac25a.png',
      alt: 'Tribal dance performance',
      title: 'Tribal Dance'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-16">
      <h2 className="text-2xl font-bold text-white text-center mb-8 drop-shadow-md">Explore Assamese Culture</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-xl font-bold text-white">{image.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CultureGallery;
