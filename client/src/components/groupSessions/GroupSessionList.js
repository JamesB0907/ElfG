import React, { useContext } from 'react';
import { GroupSession } from './GroupSession';
import { Container } from 'reactstrap';
import { SessionContext } from '../groups/GroupDetails';

export const GroupSessionList = ({ groupId }) => {
  
  const {groupSessions, setGroupSessions, userSessions, setUserSessions} = useContext(SessionContext)
  
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const sessionsWithoutUser = groupSessions?.length > 0
  ? groupSessions.filter((session) =>
      !userSessions.some((userSession) => userSession.id === session.id)
    )
  : []
  return (
    <Container>
      <h4>Group Sessions</h4>
      {groupSessions.length > 0 ? (
        sessionsWithoutUser.map((session) => (
          <GroupSession 
          key={session.id} 
          session={session}
          groupId={groupId}
          setGroupSessions={setGroupSessions}
          userSessions={userSessions}
          hasJoined={false}
          />
        ))
        ) : (
          <p>No current sessions.</p>
          )}
         
    </Container>
  )
}
