
export type Plan = 'starter' | 'pro' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  avatar: string;
  workspace: string;
}

export interface WhatsAppInstance {
  id: string;
  name: string;
  status: 'connected' | 'disconnected' | 'pairing';
  lastSeen?: string;
  phoneNumber?: string;
}

export interface FlowNode {
  id: string;
  type: 'trigger' | 'action' | 'logic';
  data: {
    label: string;
    content?: string;
    config?: any;
  };
  position: { x: number; y: number };
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft';
  nodes: FlowNode[];
  edges: any[];
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ChatSession {
  id: string;
  contactName: string;
  phoneNumber: string;
  lastMessage: string;
  unreadCount: number;
  messages: ChatMessage[];
  status: 'open' | 'resolved' | 'bot_paused';
}
