export interface SupportMessage {
  userId: string;
  userMail: string;
  topic: string;
  content: string;
  images: string[];
  date: string;
  status: 'new' | 'consider' | 'work' | 'closed';
  _id: string;
}

export interface SupportMessagesResponse {
  totalCount: number;
  supportMessage: SupportMessage[];
}
