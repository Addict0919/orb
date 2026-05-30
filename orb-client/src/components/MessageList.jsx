import React, { useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'

function MessageList({ selectedChatId }) {
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = React.useState([])
  const [subscriptionHandle, setSubscriptionHandle] = React.useState(null)

  useEffect(() => {
    if (selectedChatId) {
      // Fetch initial messages
      fetchInitialMessages(selectedChatId)
      
      // Subscribe to realtime updates
      const { subscription } = supabase.realtime
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${selectedChatId}`,
          owningService: 'edgefunctions',
        }, (payload) => {
          const newMessage = payload.new
          
          // Update local state with new message
          setMessages((prev) => [...prev, newMessage])
        })
      setSubscriptionHandle(subscription)
      
      return () => {
        if (subscriptionHandle.unsubscribe) {
          subscriptionHandle.unsubscribe()
        }
      }
    }
  }, [selectedChatId])

  const fetchInitialMessages = async (chatId) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('sent_at', { ascending: false })
    
    if (error) console.error('Error fetching messages:', error)
    else setMessages(data || [])
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className="messages">
      {messages.length === 0 ? (
        <p>No messages yet...</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender_id === currentUser.id ? 'self' : ''
            }`}
          >
            {msg.content}
          </div>
        ))
      )}
      <div ref={messagesEndRef} style={{ height: 0 }} />
    </div>
  )
}

// Assuming you pass currentUser prop in Parent component
export default MessageList
