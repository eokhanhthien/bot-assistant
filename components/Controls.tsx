import React from 'react';
import { FlowState } from '../types';
import { MENU_OPTIONS } from '../constants';

interface ControlsProps {
  flowState: FlowState;
  onOptionSelect: (id: string) => void;
  onFeedback: (isSuccess: boolean) => void;
  onRestart: () => void;
  onEndChat: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ 
  flowState, 
  onOptionSelect, 
  onFeedback, 
  onRestart,
  onEndChat
}) => {
  
  // Render Main Menu Options
  if (flowState === FlowState.SHOWING_MENU) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full animate-fade-in-up">
        {MENU_OPTIONS.map((option) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            className={`p-3 rounded-full font-medium shadow-sm transition-all text-sm md:text-base text-left truncate px-6
              ${option.id === 'chuyenVien' 
                ? 'bg-vietin-red text-white hover:bg-red-700' 
                : 'bg-vietin-dark text-white hover:bg-[#004a7a]'
              }
            `}
          >
             {option.label}
          </button>
        ))}
      </div>
    );
  }

  // Render Feedback Options (OK / Not OK)
  if (flowState === FlowState.ASKING_FEEDBACK) {
    return (
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full justify-center animate-fade-in-up">
        <button
          onClick={() => onFeedback(true)}
          className="flex-1 py-3 px-6 bg-vietin-dark text-white rounded-full font-bold hover:bg-[#004a7a] shadow-md transition-transform active:scale-95"
        >
          ✅ Đã thực hiện thành công
        </button>
        <button
          onClick={() => onFeedback(false)}
          className="flex-1 py-3 px-6 bg-vietin-dark text-white rounded-full font-bold hover:bg-[#004a7a] shadow-md transition-transform active:scale-95"
        >
          ❌ Chưa thực hiện được
        </button>
      </div>
    );
  }

  // Render End/Restart Options (Shown after feedback or success/fail flow)
  if (flowState === FlowState.IDLE) { 
    return (
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full justify-center animate-fade-in-up">
        <button
          onClick={onRestart}
          className="flex-1 py-3 px-6 bg-vietin-dark text-white rounded-full font-bold hover:bg-[#004a7a] shadow-md transition-transform active:scale-95"
        >
          🔙 Quay lại menu chính
        </button>
        <button
          onClick={onEndChat}
          className="flex-1 py-3 px-6 bg-vietin-red text-white rounded-full font-bold hover:bg-red-700 shadow-md transition-transform active:scale-95"
        >
          👋 Kết thúc cuộc trò chuyện
        </button>
      </div>
    );
  }

  // If ended
  if (flowState === FlowState.ENDED) {
     return (
        <div className="w-full text-center p-4">
            <button
                onClick={onRestart}
                className="bg-vietin-dark text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
                🔄 Bắt đầu lại
            </button>
        </div>
     )
  }

  return null;
};