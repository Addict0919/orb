import React, { useState } from 'react'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

// Mock User Context for initial implementation
const currentUser = {
  id: 'user-123',
  username: 'James',
  displayName: 'James Wilson',
}

function ChatView() {
  const [selectedChatId, setSelectedChatId] = useState('default-chat')

  // In a real app, you'd fetch contacts from your DB and
  // use this to determine which chat-id belongs to whom

  return (
    <div className="chat">
      <div className="header">
        <h2>{currentUser.displayName}</h2>
      </div>

      <MessageList selectedChatId={selectedChatId} />

      {/* Note: Real app would include online/offline status */}
      {/*
      <div style={{ padding: '10px', fontSize: '12px', color: '#9ca3af' }}>
        {currentUser.isOnline ? 'Online' : 'Offline'}
      </div>
      */}

      <MessageInput currentUser={currentUser} />
    </div>
  )
}

export default ChatView
