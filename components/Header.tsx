import React from 'react';
import { APP_CONFIG } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-vietin-light border-b-[3px] border-vietin-dark">
      <div className="max-w-3xl mx-auto px-4 py-4 flex flex-col items-center justify-center text-center">
        {/* Logo Area */}
        <div className="mb-2">
            <img 
              src="https://github.com/chatbotlinhchi/chatbot2/blob/main/Logo.png?raw=true" 
              alt="VietinBank Logo" 
              className="h-12 md:h-16 w-auto object-contain"
            />
        </div>
        
        {/* Title */}
        <h1 className="text-vietin-dark font-semibold text-sm md:text-lg lg:text-xl leading-tight">
          {APP_CONFIG.botName}
        </h1>
      </div>
    </header>
  );
};