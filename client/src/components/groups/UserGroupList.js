import React from 'react'
import { Group } from './Group'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'

export const UserGroupList = ({ userGroups, setUserGroups, setAllGroups }) => {
  return (
    <Container>
      <h2>Your Groups</h2>
        <Row>
      {userGroups.map((group) => (
        <Col key={group.id} xs="12" md="6" lg="4">
            <Group 
            group={group}
            hasUserJoined={true}
            setUserGroups={setUserGroups}
            setAllGroups={setAllGroups}
            />
        </Col>
        ))}
        </Row>
      </Container>
  )
}
