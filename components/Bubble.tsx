import React, { useState } from 'react';
import { MessageType, Sender, Step } from '../types';

interface BubbleProps {
  content: string;
  sender: Sender;
  type: MessageType;
  title?: string;
  extraData?: any;
}

export const Bubble: React.FC<BubbleProps> = ({ content, sender, type, title, extraData }) => {
  const isBot = sender === Sender.BOT;

  // Bot bubble style: Vietin Light Blue bg (rgb(126, 211, 247)), Dark Blue text (rgb(0, 89, 147))
  // User bubble style: Vietin Dark Blue bg (rgb(0, 89, 147)), White text
  const bubbleContainerClass = isBot
    ? 'bg-vietin-light text-vietin-dark rounded-tl-none'
    : 'bg-vietin-dark text-white rounded-tr-none ml-auto';

  // Format text to handle bolding **text** and newlines
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line.split('**').map((part, index) => 
          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        )}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in-up`}>
      <div className={`flex flex-col max-w-[90%] md:max-w-[85%] ${isBot ? 'items-start' : 'items-end'}`}>
        
        {/* Sender Name */}
        <span className="text-xs text-gray-500 mb-1 px-1">
          {isBot ? 'VietinBot' : 'Quý khách'}
        </span>

        {/* The Bubble Content */}
        <div className={`px-5 py-4 rounded-2xl shadow-sm ${bubbleContainerClass} text-sm md:text-[15px] leading-relaxed break-words w-full`}>
          
          {/* Simple Text */}
          {type === MessageType.TEXT && (
            <div>{formatText(content)}</div>
          )}

          {/* Steps List */}
          {type === MessageType.STEPS && extraData && (
             <div className="mt-2 space-y-2">
               {(extraData as Step[]).map((step, idx) => (
                 <div key={idx} className="bg-white/50 p-3 rounded-lg border-l-4 border-vietin-dark">
                   <strong className="text-vietin-red block mb-1">{step.step}:</strong>
                   <span className="text-vietin-dark">{formatText(step.content)}</span>
                 </div>
               ))}
             </div>
          )}

          {/* Video Link Button */}
          {type === MessageType.VIDEO_LINK && (
            <div className="mt-1">
              {/* Video Button with Thumbnail */}
              <a 
                href={content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                {/* Thumbnail Container */}
                <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* YouTube Thumbnail */}
                  <img 
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(content)}/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${getYouTubeVideoId(content)}/hqdefault.jpg`;
                    }}
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Video Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white font-semibold text-sm flex items-center gap-2">
                      <i className="fas fa-play-circle text-red-600"></i>
                      Xem video hướng dẫn
                    </p>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Map Link Button */}
          {type === MessageType.MAP_LINK && (
            <div className="mt-1">
              <a 
                href={content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-vietin-dark hover:bg-[#004a7a] text-white rounded-lg font-semibold shadow-md transition-transform hover:-translate-y-0.5"
              >
                <i className="fas fa-map-marker-alt text-lg"></i>
                Mở bản đồ
              </a>
            </div>
          )}

          {/* Google Slides Viewer */}
          {type === MessageType.SLIDES && extraData && (
            <SlideViewer slidesId={extraData.slidesId} totalSlides={extraData.totalSlides} title={title || "Tài liệu"} />
          )}

        </div>
      </div>
    </div>
  );
};

// Sub-component for Slides
const SlideViewer: React.FC<{ slidesId: string; totalSlides: number; title: string }> = ({ slidesId, totalSlides, title }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => setCurrentSlide(p => (p < totalSlides ? p + 1 : p));
  const prevSlide = () => setCurrentSlide(p => (p > 1 ? p - 1 : p));

  const src = `https://docs.google.com/presentation/d/${slidesId}/embed?start=false&loop=false&delayms=3000&slide=id.p${currentSlide > 1 ? currentSlide : ''}&rm=minimal`;

  // Handle ESC key to close fullscreen
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isFullscreen]);

  const ViewerContent = ({ full = false }) => (
     <div className={`relative w-full ${full ? 'h-full flex flex-col items-center justify-center' : ''}`}>
        
        {/* Header for Fullscreen - REMOVED as requested */}
        
        {/* Iframe Container */}
        <div className={`relative bg-black rounded-lg overflow-hidden shadow-lg ${full ? 'w-full h-full' : 'w-full aspect-video'}`}>
           <iframe 
             src={src} 
             className="w-full h-full border-0"
             allowFullScreen
             title="Slide Content"
           />
        </div>

        {/* Controls Bar */}
        <div className={`flex items-center justify-between mt-2 ${full ? 'w-full px-2 pb-2' : 'w-full text-vietin-dark'}`}>
           <div className="flex gap-2">
             <button onClick={prevSlide} disabled={currentSlide === 1} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center shadow-md">
                <i className="fa-solid fa-chevron-left"></i>
             </button>
             <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center shadow-md">
                <i className="fa-solid fa-chevron-right"></i>
             </button>
           </div>
           
           <span className={`font-bold ${full ? 'text-vietin-dark' : ''}`}>
             {currentSlide} / {totalSlides}
           </span>

           {!full ? (
             <button onClick={() => setIsFullscreen(true)} className="w-10 h-10 rounded-full bg-vietin-red text-white hover:scale-110 transition-transform flex items-center justify-center shadow-md">
                <i className="fa-solid fa-expand"></i>
             </button>
           ) : (
             <button onClick={() => setIsFullscreen(false)} className="w-10 h-10 rounded-full bg-vietin-red text-white hover:scale-110 transition-transform flex items-center justify-center shadow-md">
                <i className="fa-solid fa-compress"></i>
             </button>
           )}
        </div>
     </div>
  );

  return (
    <>
      <ViewerContent />
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-vietin-light flex flex-col animate-fade-in overflow-hidden">
           {/* Iframe Container - Full Screen with scaling */}
           <div className="relative flex-1 w-full flex items-center justify-center bg-vietin-light overflow-hidden">
             <iframe 
               src={src} 
               className="w-[177.78vh] h-full border-0"
               style={{
                 minWidth: '100%',
                 minHeight: '56.25vw', // 16:9 aspect ratio
               }}
               allowFullScreen
               title="Slide Content"
             />
           </div>

           {/* Controls Bar - Fixed Bottom */}
           <div className="flex items-center justify-between p-3 bg-vietin-light text-vietin-dark w-full border-t border-vietin-dark/20">
             <div className="flex gap-2">
               <button onClick={prevSlide} disabled={currentSlide === 1} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-chevron-left"></i>
               </button>
               <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-chevron-right"></i>
               </button>
             </div>
             
             <span className="font-bold">
               {currentSlide} / {totalSlides}
             </span>

             <button onClick={() => setIsFullscreen(false)} className="w-10 h-10 rounded-full bg-vietin-red text-white hover:scale-110 transition-transform flex items-center justify-center shadow-md">
                <i className="fa-solid fa-compress"></i>
             </button>
           </div>
        </div>
      )}
    </>
  );
};