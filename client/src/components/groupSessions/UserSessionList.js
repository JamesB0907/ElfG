import { Col, Container, Row } from 'reactstrap'
import { GroupSession } from './GroupSession'
import { useContext } from 'react'
import { SessionContext } from '../groups/GroupDetails'

export const UserSessionList = ({ session, groupId }) => {

  const {groupSessions, setGroupSessions, userSessions, setUserSessions} = useContext(SessionContext)

  return (
    <Container>
        <Row>
          <h2>this is usersessions</h2>
      {userSessions.map((session) => (
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
