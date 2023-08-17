import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { editGroupNote, getGroupNotesByGroupId } from '../managers/NoteManager'
import './GroupNoteEdit.css'

export const GroupNoteEdit = ({ note, setGroupNotes }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const [modalOpen, setModalOpen] = useState(false)
  const [editedNote, updateEditedNote] = useState({
    type: note.type,
    title: note.title,
    text: note.text,
    relDate: note.relDate,
    postedOn: note.postedOn
  })

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const saveNote = { ...editedNote }
    saveNote.id = note.id
    saveNote.relDate = new Date(editedNote.relDate).toISOString()
    editGroupNote(saveNote)
      .then(() => toggleModal())
      .then(() => getGroupNotesByGroupId(note.groupId))
      .then((newData) => setGroupNotes(newData))

  }

  return (
    <>
      <Button className='note-edit-button' color="success" onClick={toggleModal}>
        Edit Note
      </Button>
      <Modal className='note-edit-modal' isOpen={modalOpen} toggle={toggleModal}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Edit Note</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Type"
              value={editedNote.type}
              onChange={(e) => {
                const copy = { ...editedNote }
                copy.type = e.target.value
                updateEditedNote(copy)
              }}
            />
            <Input
              type="text"
              placeholder="Title"
              value={editedNote.title}
              onChange={(e) => {
                const copy = { ...editedNote }
                copy.title = e.target.value
                updateEditedNote(copy)
              }}
            />
            <Input
              type="textarea"
              placeholder="Text"
              value={editedNote.text}
              onChange={(e) => {
                const copy = { ...editedNote }
                copy.text = e.target.value
                updateEditedNote(copy)
              }}
            />
            <Input
              type="date"
              placeholder="Relevant Date"
              value={editedNote.relDate}
              onChange={(e) => {
                const copy = { ...editedNote }
                copy.relDate = e.target.value
                updateEditedNote(copy)
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success">
              Save Changes
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}
