export interface Message {
    id: number
    senderId: number
    senderUsername: string
    senderPhotoUrl: string
    recipientId: number
    recipientPhotoUrl: string
    recipientUsername: string
    content: string
    dateRead?: Date 
    messageSent: Date
  }
  