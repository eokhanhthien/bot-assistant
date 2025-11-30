export enum MessageType {
  TEXT = 'TEXT',
  STEPS = 'STEPS',
  VIDEO_LINK = 'VIDEO_LINK',
  MAP_LINK = 'MAP_LINK',
  SLIDES = 'SLIDES',
  IMAGE = 'IMAGE'
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
  content: string;
  title?: string;
  extraData?: any;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content?: string;
  steps?: Step[];
  slidesId?: string;
  totalSlides?: number;
  videoLink?: string;
  mapLink?: string;
}

export enum FlowState {
  IDLE = 'IDLE',
  SHOWING_MENU = 'SHOWING_MENU',
  SHOWING_CONTENT = 'SHOWING_CONTENT',
  ASKING_FEEDBACK = 'ASKING_FEEDBACK',
  ENDED = 'ENDED'
}