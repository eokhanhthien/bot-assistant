export enum MessageType {
  TEXT = 'text',
  EMBED = 'embed',
  IMAGE = 'image',
  STEPS = 'steps',
  SLIDES = 'slides',
  VIDEO_LINK = 'video_link'
}

export enum Sender {
  BOT = 'bot',
  USER = 'user'
}

export interface Step {
  step: string;
  content: string;
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  type: MessageType;
  content: string; // Text content, or JSON string for complex objects
  title?: string;
  extraData?: any; // For slidesId, totalSlides, steps array, etc.
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content?: string; // Intro text
  steps?: Step[];
  slidesId?: string;
  totalSlides?: number;
  videoLink?: string;
}

export enum FlowState {
  IDLE = 'IDLE',
  SHOWING_MENU = 'SHOWING_MENU',
  SHOWING_CONTENT = 'SHOWING_CONTENT',
  ASKING_FEEDBACK = 'ASKING_FEEDBACK',
  ENDED = 'ENDED'
}