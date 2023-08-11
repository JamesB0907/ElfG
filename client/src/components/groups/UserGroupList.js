import React, { useContext } from 'react'
import { Group } from './Group'
import { Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Context } from './GroupPage'

export const UserGroupList = () => {
  const { allGroups, setAllGroups, userGroups, setUserGroups } = useContext(Context)

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
