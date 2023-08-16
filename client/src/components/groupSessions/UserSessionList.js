import { Col, Container, Row } from 'reactstrap';
import { GroupSession } from './GroupSession';
import { useContext } from 'react';
import { SessionContext } from '../groups/GroupDetails';

export const UserSessionList = ({ groupId }) => {
  const { userSessions } = useContext(SessionContext);

  return (
    <Container>
      <Row>
        {userSessions.map(session => {
          if (session.groupId === groupId) {
            return (
              <Col key={session.id} xs="12" md="6" lg="4">
                <GroupSession
                  hasJoined={true}
                  session={session}
                  groupId={groupId}
                />
              </Col>
            );
          }
          return null;
        })}
      </Row>
    </Container>
  )
}
