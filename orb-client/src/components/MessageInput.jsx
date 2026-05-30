import React, { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

function MessageInput({ currentUser }) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) return

    const { error, data } = await supabase
      .from('messages')
      .insert([
        {
          chat_id: 'default-chat', // Will be updated dynamically
          sender_id: currentUser.id,
          content: message,
        },
      ])
      .select()

    if (error) console.error('Error sending message:', error)
    
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="input-area">
      <input
        id="messageInput"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        aria-label="Message input"
      />
      <button type="submit" disabled={!message.trim()}>
        Send
      </button>
    </form>
  )
}

export default MessageInput
