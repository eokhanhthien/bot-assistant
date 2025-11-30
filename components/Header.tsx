import React from 'react';
import { APP_CONFIG } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-[rgba(126,211,247,0.85)] backdrop-blur-md border-b-[3px] border-vietin-dark transition-all duration-300">
      <div className="max-w-3xl mx-auto px-4 py-2 flex flex-col items-center justify-center text-center">
        {/* Logo Area - Reduced size */}
        <div className="mb-1">
            <img 
              src="https://github.com/chatbotlinhchi/chatbot2/blob/main/Logo.png?raw=true" 
              alt="VietinBank Logo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
        </div>
        
        {/* Title - Reduced size */}
        <h1 className="text-vietin-dark font-medium text-xs md:text-sm leading-tight">
          {APP_CONFIG.botName}
        </h1>
      </div>
    </header>
  );
};