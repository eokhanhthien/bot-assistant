import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Bubble } from './components/Bubble';
import { Controls } from './components/Controls';
import { ChatMessage, Sender, MessageType, FlowState } from './types';
import { APP_CONFIG, KNOWLEDGE_BASE } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [flowState, setFlowState] = useState<FlowState>(FlowState.SHOWING_MENU);
  const [isTyping, setIsTyping] = useState(false);
  const [isControlsExpanded, setIsControlsExpanded] = useState(true); // New state for controls visibility
  const [userInput, setUserInput] = useState(''); // New state for user input
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false); // Add flag to prevent double initialization

  // Helper to add messages
  const addMessage = (content: string, sender: Sender, type: MessageType = MessageType.TEXT, title?: string, extraData?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(),
      sender,
      type,
      content,
      title,
      extraData
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Helper for typing delay simulation
  const simulateBotTyping = (callback: () => void, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  // Initial Greeting
  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initChat = async () => {
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 600)); 
      
      addMessage(APP_CONFIG.welcomeMessage, Sender.BOT);
      
      setIsTyping(false);
      setFlowState(FlowState.SHOWING_MENU);
    };

    initChat();
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, flowState]);

  // Logic flow
  const handleOptionSelect = (id: string) => {
    const option = KNOWLEDGE_BASE[id];
    if (!option) return;

    setFlowState(FlowState.SHOWING_CONTENT);

    // 1. User Bubble
    addMessage(option.title, Sender.USER);

    // 2. Bot Response Sequence
    setIsTyping(true);
    
    // Using a promise chain for sequential delivery
    const sequence = async () => {
       // Initial Content Text
       if (option.content) {
         await new Promise(r => setTimeout(r, 600));
         addMessage(option.content, Sender.BOT);
       }

       // Steps
       if (option.steps && option.steps.length > 0) {
         await new Promise(r => setTimeout(r, 800));
         addMessage("", Sender.BOT, MessageType.STEPS, undefined, option.steps);
       }

       // Slides
       if (option.slidesId) {
         await new Promise(r => setTimeout(r, 800));
         addMessage("", Sender.BOT, MessageType.SLIDES, option.title, { 
             slidesId: option.slidesId, 
             totalSlides: option.totalSlides 
         });
       }

       // Video Link
       if (option.videoLink) {
         await new Promise(r => setTimeout(r, 800));
         addMessage(option.videoLink, Sender.BOT, MessageType.VIDEO_LINK, option.title);
       }

       // Map Link
       if (option.mapLink) {
         await new Promise(r => setTimeout(r, 800));
         addMessage(option.mapLink, Sender.BOT, MessageType.MAP_LINK, option.title);
       }
       
       setIsTyping(false);

       if (id === 'chuyenVien') {
         setFlowState(FlowState.IDLE);
       } else {
         setTimeout(() => {
             addMessage(APP_CONFIG.feedbackQuestion, Sender.BOT);
             setFlowState(FlowState.ASKING_FEEDBACK);
         }, 800);
       }
    };

    sequence();
  };

  const handleFeedback = (isSuccess: boolean) => {
    setFlowState(FlowState.SHOWING_CONTENT);

    if (isSuccess) {
      addMessage("✅ Đã thực hiện thành công", Sender.USER);
      simulateBotTyping(() => {
        addMessage(APP_CONFIG.feedbackSuccess, Sender.BOT);
        setTimeout(() => {
            setFlowState(FlowState.SHOWING_MENU);
        }, 1500); 
      });
    } else {
      addMessage("❌ Chưa thực hiện được", Sender.USER);
      simulateBotTyping(() => {
        addMessage(APP_CONFIG.feedbackFailure, Sender.BOT);
        setTimeout(() => {
           addMessage(APP_CONFIG.contactInfo, Sender.BOT);
           setFlowState(FlowState.IDLE);
        }, 1000);
      });
    }
  };

  const handleRestart = () => {
    addMessage("🔙 Quay lại menu chính", Sender.USER);
    if (flowState === FlowState.ENDED) {
        setMessages([]); // Clear chat if restarting from end
        setIsTyping(true);
        setTimeout(() => {
             addMessage(APP_CONFIG.welcomeMessage, Sender.BOT);
             setIsTyping(false);
             setFlowState(FlowState.SHOWING_MENU);
        }, 600);
    } else {
        simulateBotTyping(() => {
            addMessage("Dạ, mời Quý khách chọn nội dung cần hỗ trợ ạ:", Sender.BOT);
            setFlowState(FlowState.SHOWING_MENU);
        });
    }
  };

  const handleEndChat = () => {
    addMessage("👋 Kết thúc cuộc trò chuyện", Sender.USER);
    simulateBotTyping(() => {
        addMessage(APP_CONFIG.goodbyeMessage, Sender.BOT);
        setFlowState(FlowState.ENDED);
    });
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    
    // Add user message
    addMessage(userInput, Sender.USER);
    setUserInput('');
    
    // Bot auto-reply (you can customize this logic)
    simulateBotTyping(() => {
      addMessage("Cảm ơn Quý khách đã gửi tin nhắn. Em đang xử lý yêu cầu của Quý khách.", Sender.BOT);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header />

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-2 md:p-4 w-full max-w-3xl mx-auto scrollbar-hide">
        <div className="flex flex-col space-y-2 pb-36 pt-2">
          {messages.map(msg => (
            <Bubble 
              key={msg.id} 
              content={msg.content} 
              sender={msg.sender} 
              type={msg.type}
              title={msg.title}
              extraData={msg.extraData}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex w-full justify-start mb-4 animate-fade-in">
               <div className="bg-vietin-light rounded-tl-none rounded-2xl px-5 py-4 flex space-x-2 items-center shadow-sm">
                  <div className="w-2 h-2 bg-vietin-dark rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-vietin-dark rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-vietin-dark rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
               </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Sticky Bottom Controls */}
      <footer className="fixed bottom-0 left-0 w-full bg-white z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto">
          
          {/* Toggle Button - Top */}
          {isControlsExpanded && (
            <div className="flex justify-center py-2 border-b border-gray-200">
              <button 
                onClick={() => setIsControlsExpanded(false)}
                className="p-2 text-vietin-dark hover:text-vietin-red transition-all duration-200"
              >
                <i className="fa-solid fa-chevron-down text-2xl"></i>
              </button>
            </div>
          )}

          {/* Controls Section - Collapsible */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isControlsExpanded ? 'max-h-[45vh] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="overflow-y-auto scrollbar-hide p-4 max-h-[40vh]">
              <Controls 
                flowState={flowState}
                onOptionSelect={handleOptionSelect}
                onFeedback={handleFeedback}
                onRestart={handleRestart}
                onEndChat={handleEndChat}
              />
            </div>
          </div>

          {/* Expand Button - Show when collapsed */}
          {!isControlsExpanded && (
            <div className="flex justify-center py-2 border-b border-gray-200">
              <button 
                onClick={() => setIsControlsExpanded(true)}
                className="p-2 text-vietin-dark hover:text-vietin-red transition-all duration-200 animate-bounce"
              >
                <i className="fa-solid fa-chevron-up text-2xl"></i>
              </button>
            </div>
          )}

          {/* Input Box - Always Visible */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 max-w-3xl mx-auto">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-vietin-dark focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={userInput.trim() === ''}
                className="w-12 h-12 rounded-full bg-vietin-red text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:scale-110 active:scale-95"
              >
                <i className="fa-solid fa-paper-plane text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;