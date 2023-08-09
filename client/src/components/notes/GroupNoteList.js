import React from 'react'
import { GroupNote } from './GroupNote'
import { Container, Row, Col } from 'reactstrap'

export const GroupNoteList = ({ notes }) => {
  return (
    <Container>
        <h4>Group Notes</h4>
      <Row>
        {notes.map((note) => (
          <Col key={note.id} xs="12" md="6" lg="4">
            <GroupNote note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
