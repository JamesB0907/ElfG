import { Col, Container, Row } from 'reactstrap'
import { GroupSession } from './GroupSession'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../groups/GroupDetails'
import { getSessionsByUserId } from '../managers/UserManager'

export const UserSessionList = ({ groupId }) => {
  const [filteredSessions, setFilteredSessions] = useState([])

  const {groupSessions, setGroupSessions, userSessions, setUserSessions} = useContext(SessionContext)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    setFilteredSessions(userSessions?.filter(session => session.groupId == groupId))
  }, [userSessions])

  
  // const userSessionsInGroup = userSessions?.filter(session => session.groupId === groupId)
  // console.log(userSessionsInGroup)

  return (
    <Container>
        <Row>
          {filteredSessions.length > 0 ? (<h4>Your Sessions</h4>) : ('') }
      {filteredSessions.map((session) => (
        <Col key={session.id} xs="12" md="6" lg="4">
            <GroupSession
            hasJoined={true}
            session={session}
            groupId={groupId}
            />
        </Col>
        ))}
        </Row>
      </Container>
  )
}
