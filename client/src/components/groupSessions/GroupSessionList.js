import React from 'react';
import { GroupSession } from './GroupSession';
import { GroupSessionForm } from './GroupSessionForm';
import { Container } from 'reactstrap';

export const GroupSessionList = ({ sessions, setGroupSessions, groupId }) => {
  return (
    <Container>
      <GroupSessionForm 
      setGroupSessions={setGroupSessions}
      groupId={groupId}
      />
      <h4>Group Sessions</h4>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <GroupSession 
          key={session.id} 
          session={session}
          groupId={groupId}
          setGroupSessions={setGroupSessions}
          />
        ))
      ) : (
        <p>No current sessions.</p>
      )}
    </Container>
  )
}
