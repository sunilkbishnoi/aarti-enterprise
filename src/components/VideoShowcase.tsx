import { useState } from 'react';
import { Play, X } from 'lucide-react';

import videoHotelInstall from '@/assets/video-thumb-hotel-install.jpg';
import videoSpiralInstall from '@/assets/video-thumb-spiral-install.jpg';
import videoElevatorInstall from '@/assets/video-thumb-elevator-install.jpg';
import videoTestimonial1 from '@/assets/video-thumb-testimonial-1.jpg';
import videoTestimonial2 from '@/assets/video-thumb-testimonial-2.jpg';
import videoTestimonial3 from '@/assets/video-thumb-testimonial-3.jpg';

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  category: 'installation' | 'testimonial';
  youtubeId: string;
}

const videos: VideoItem[] = [
  {
    id: '1',
    thumbnail: videoHotelInstall,
    title: 'Luxury Hotel Glass Railing Installation',
    description: 'Complete glass railing installation at a 5-star hotel in Vadodara',
    duration: '4:32',
    category: 'installation',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  },
  {
    id: '2',
    thumbnail: videoSpiralInstall,
    title: 'Spiral Staircase SS Railing',
    description: 'Custom spiral staircase railing installation in modern villa',
    duration: '3:45',
    category: 'installation',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  },
  {
    id: '3',
    thumbnail: videoElevatorInstall,
    title: 'PVD Elevator Panel Installation',
    description: 'Rose gold PVD coated SS panels for commercial elevator',
    duration: '5:18',
    category: 'installation',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  },
  {
    id: '4',
    thumbnail: videoTestimonial1,
    title: 'Mr. Rajesh Patel - Builder',
    description: '"AARTI ENTERPRISE has been our trusted supplier for 8+ years. Quality and service is unmatched."',
    duration: '2:15',
    category: 'testimonial',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  },
  {
    id: '5',
    thumbnail: videoTestimonial2,
    title: 'Ar. Priya Sharma - Architect',
    description: '"Their designer sheets and custom solutions have elevated our projects significantly."',
    duration: '2:48',
    category: 'testimonial',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  },
  {
    id: '6',
    thumbnail: videoTestimonial3,
    title: 'Mr. Vikram Mehta - Hotel Owner',
    description: '"From glass railings to SS accessories, they delivered everything on time with perfection."',
    duration: '3:02',
    category: 'testimonial',
    youtubeId: 'dQw4w9WgXcQ' // Replace with your actual YouTube video ID
  }
];

const VideoShowcase = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'installation' | 'testimonial'>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = activeFilter === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Watch Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Project Videos & Testimonials
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See our craftsmanship in action and hear from our satisfied clients across Gujarat
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { key: 'all', label: 'All Videos' },
            { key: 'installation', label: 'Installations' },
            { key: 'testimonial', label: 'Testimonials' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as typeof activeFilter)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-white text-xs font-medium">
                  {video.duration}
                </div>

                {/* Category Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  video.category === 'installation' 
                    ? 'bg-blue-500/80 text-white' 
                    : 'bg-amber-500/80 text-white'
                }`}>
                  {video.category === 'installation' ? 'Installation' : 'Testimonial'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal with YouTube Player */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="relative w-full max-w-4xl bg-card rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* YouTube Embedded Player */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  selectedVideo.category === 'installation' 
                    ? 'bg-blue-500/10 text-blue-600' 
                    : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {selectedVideo.category === 'installation' ? 'Installation Video' : 'Client Testimonial'}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoShowcase;
