import React from 'react'
import Chat from '../Chat/Chat'
import Users from '../Users/Users'

const Message = () => {
  return (
    <div style={{ top: "120px", display: "flex", justifyContent: "center", position: "relative", fontSize: "100px", border: "1px solid black", width: "80vw", height: "80vh", margin: "auto" }}>
      <Users/>
      <Chat/>
    </div>
  )
}

export default Message