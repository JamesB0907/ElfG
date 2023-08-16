import React from 'react';
import { GroupNote } from './GroupNote';
import { Container, Row, Col } from 'reactstrap';
import { GroupNoteForm } from './GroupNoteForm';

export const GroupNoteList = ({ notes, groupId, setGroupNotes }) => {
  return (
    <Container>
      <h4>Group Notes</h4>
      <GroupNoteForm 
      groupId={groupId}
      setGroupNotes={setGroupNotes}
      />
      {notes.length > 0 ? (
        <Row>
          {notes.map((note) => (
            <Col key={note.id} xs="12" md="6" lg="4">
              <GroupNote 
              note={note}
              setGroupNotes={setGroupNotes}
              groupId={groupId} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No notes yet!</p>
      )}
    </Container>
  )
}
