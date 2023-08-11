import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Group } from './Group';
import { Context } from './GroupPage';

export const GroupList = ({ }) => {
  const { allGroups, setAllGroups, userGroups, setUserGroups } = useContext(Context)

  const groupsWithoutUser = allGroups.filter((group) => !userGroups.some((userGroup) => userGroup.id === group.id))
  return (
    <Container>
      <Row>
        <h1>Join A New Adventure</h1>
        {groupsWithoutUser
          .map((group) => (
            <Col key={group.id} xs="12" md="6" lg="4">
              <Group 
                allGroups={allGroups}
                group={group}
                hasUserJoined={false}
                setAllGroups={setAllGroups}
              />
            </Col>
          ))}
      </Row>
    </Container>
  )
}
