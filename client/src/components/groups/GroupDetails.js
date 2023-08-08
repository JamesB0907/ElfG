import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionList } from '../groupSessions/GroupSessionList'
import { Container } from 'reactstrap'
import { format } from 'date-fns'

export const GroupDetails = () => {
  const { groupId } = useParams()
  const [groupSessions, setGroupSessions] = useState([])

  useEffect(() => {
    getGroupSessionsByGroupId(groupId)
      .then((sessions) => {
        setGroupSessions(sessions)
      })
      .catch((error) => {
        console.error('Error fetching group sessions:', error)
      });
  }, [groupId])

  // ...

  return (
    <Container> 
      <GroupSessionList 
      sessions={groupSessions}
       />
        <Outlet />
    </Container>
  )
}
