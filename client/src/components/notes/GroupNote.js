import { format } from 'date-fns'
import React from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { deleteGroupNote, getAllGroupNotes, getGroupNotesByGroupId } from '../managers/NoteManager'
import { GroupNoteEdit } from './GroupNoteEdit'
import './GroupNote.css'

export const GroupNote = ({ note, setGroupNotes, groupId }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const isUserNote = note.userId === currentUser.id

  const handleDelete = () => {
    deleteGroupNote(note.id)
      .then(() => getGroupNotesByGroupId(groupId))
      .then((newNotes) => setGroupNotes(newNotes))
  }

  return (
    <Card className='note-container'>
      <CardBody className='note-card'>
        <CardTitle className='note-title'>{note.title}:</CardTitle>
        <CardText><strong>Note Type: {note.type}</strong></CardText>
        <CardText>{note.text}</CardText>
        <CardText>Relevant Date: {format(new Date(note.relDate), 'MMMM d, yyyy')}</CardText>
        {isUserNote && (
          <>
          <Button color="secondary" onClick={handleDelete}>Delete</Button>
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
