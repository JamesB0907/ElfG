import { Col, Container, Row } from 'reactstrap'
import { GroupSession } from './GroupSession'
import { useContext } from 'react'
import { SessionContext } from '../groups/GroupDetails'

export const UserSessionList = ({ groupId }) => {

  const {groupSessions, setGroupSessions, userSessions, setUserSessions} = useContext(SessionContext)
  const userSessionsInGroup = userSessions?.filter(session => session.groupId === groupId);

  return (
    <Container>
        <Row>
          {userSessionsInGroup.length > 0 ? (<h4>Your Sessions</h4>) : ('') }
      {userSessionsInGroup.map((session) => (
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
