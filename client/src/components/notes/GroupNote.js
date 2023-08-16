import { format } from 'date-fns'
import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { deleteGroupNote, getAllGroupNotes, getGroupNotesByGroupId } from '../managers/NoteManager'
import { GroupNoteEdit } from './GroupNoteEdit'

export const GroupNote = ({ note, setGroupNotes, groupId }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const isUserNote = note.userId === currentUser.id

  const handleDelete = () => {
    deleteGroupNote(note.id)
      .then(() => getGroupNotesByGroupId(groupId))
      .then((newNotes) => setGroupNotes(newNotes))
  }

  return (
    <Card>
      <CardBody>
        <CardTitle><strong>{note.title}</strong></CardTitle>
        <CardText>Note Type: {note.type}</CardText>
        <CardText>{note.text}</CardText>
        <CardText>Relevant Date: {format(new Date(note.relDate), 'MMMM d, yyyy')}</CardText>
        {isUserNote && (
          <>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <GroupNoteEdit 
          note={note}
          setGroupNotes={setGroupNotes}
          />
          </>
          )}
      </CardBody>
    </Card>
  )
}
