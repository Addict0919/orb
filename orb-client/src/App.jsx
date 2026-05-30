import React from 'react'
import './App.css'
import ChatView from './components/ChatView'

function App() {
  return (
    <div className="app-root">
      {/* Sidebar - Contact List */}
      <div className="sidebar">
        <div className="logo">Orb</div>
        
        <div className="contact" data-chat-id="chat-james">
          James
        </div>
        <div className="contact" data-chat-id="chat-alex">
          Alex
        </div>
        <div className="contact" data-chat-id="chat-sarah">
          Sarah
        </div>
      </div>

      {/* Main Chat Area */}
      <ChatView />
    </div>
  )
}

export default App
