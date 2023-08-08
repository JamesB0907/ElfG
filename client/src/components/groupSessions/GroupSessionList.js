import React from 'react'
import { GroupSession } from './GroupSession'

export const GroupSessionList = ({ sessions}) => {
  return (
    <div>
      <h4>Group Sessions</h4>
      {sessions.map((session) => (
        <GroupSession 
        key={session.id} 
        session={session}
        />
      ))}
    </div>
  )
}
