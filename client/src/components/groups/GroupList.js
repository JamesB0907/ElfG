import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Group } from './Group'

export const GroupList = ({ groups, userGroups }) => {
  return (
      <Container>
      <Row>
        <h1>Join A New Adventure</h1>
        {groups.map((group) => (
          <Col key={group.id} xs="12" md="6" lg="4">
            <Group 
            group={group}
            hasUserJoined={false}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

