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
               <a 
                 href={content} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md transition-transform hover:-translate-y-0.5"
               >
                 <div className="w-6 h-5 bg-white rounded flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-red-600 border-y-[4px] border-y-transparent ml-0.5"></div>
                 </div>
                 {title === '7. Chỉ đường đến PGD & ATM' ? 'Mở bản đồ' : 'Xem video hướng dẫn'}
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

  const ViewerContent = ({ full = false }) => (
     <div className={`relative w-full ${full ? 'h-full flex flex-col items-center justify-center' : ''}`}>
        
        {/* Header for Fullscreen */}
        {full && (
          <div className="absolute top-5 left-5 bg-vietin-dark/90 text-white px-4 py-2 rounded-full z-50 backdrop-blur-sm font-semibold">
            {title} - {currentSlide}/{totalSlides}
          </div>
        )}
        
        {/* Iframe Container */}
        <div className={`relative bg-black rounded-lg overflow-hidden shadow-lg ${full ? 'w-[95%] h-[85vh] max-w-[1600px]' : 'w-full aspect-video'}`}>
           <iframe 
             src={src} 
             className="w-full h-full border-0"
             allowFullScreen
             title="Slide Content"
           />
           
           {/* Navigation Overlays (Clickable areas) */}
           <div className="absolute inset-y-0 left-0 w-16 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity">
               <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="bg-vietin-dark/80 text-white p-3 rounded-full hover:bg-vietin-red transition-colors">
                 <i className="fa-solid fa-chevron-left"></i>
               </button>
           </div>
           <div className="absolute inset-y-0 right-0 w-16 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity">
               <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="bg-vietin-dark/80 text-white p-3 rounded-full hover:bg-vietin-red transition-colors">
                 <i className="fa-solid fa-chevron-right"></i>
               </button>
           </div>
        </div>

        {/* Controls Bar */}
        <div className={`flex items-center justify-between mt-2 ${full ? 'w-[95%] max-w-[1600px] text-white' : 'w-full text-vietin-dark'}`}>
           <div className="flex gap-2">
             <button onClick={prevSlide} disabled={currentSlide === 1} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center">
                <i className="fa-solid fa-chevron-left"></i>
             </button>
             <button onClick={nextSlide} disabled={currentSlide === totalSlides} className="w-10 h-10 rounded-full bg-vietin-dark text-white disabled:opacity-50 hover:bg-vietin-red transition-colors flex items-center justify-center">
                <i className="fa-solid fa-chevron-right"></i>
             </button>
           </div>
           
           <span className="font-bold">
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
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm p-4 flex items-center justify-center animate-fade-in">
           <button onClick={() => setIsFullscreen(false)} className="absolute top-5 right-5 w-12 h-12 bg-vietin-red text-white rounded-full flex items-center justify-center text-xl hover:rotate-90 transition-transform shadow-lg z-[10000]">
             <i className="fa-solid fa-xmark"></i>
           </button>
           <ViewerContent full={true} />
        </div>
      )}
    </>
  );
};