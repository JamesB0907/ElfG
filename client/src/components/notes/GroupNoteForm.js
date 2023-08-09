import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { addGroupNote, getAllGroupNotes, getGroupNotesByGroupId } from '../managers/NoteManager'

export const GroupNoteForm = ({ groupId, setGroupNotes }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))


  const [modalOpen, setModalOpen] = useState(false)
  const [note, update] = useState({
    type: "",
    title: "",
    text: "",
    relDate: "",
    postedOn: ""
  })

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newNote = {
      userId: currentUser.id,
      groupId: groupId,
      type: note.type,
      title: note.title,
      text: note.text,
      relDate: note.relDate,
      postedOn: new Date()
    }
    return addGroupNote(newNote)
      .then(() => toggleModal())
      .then(() => getGroupNotesByGroupId(groupId))
      .then((newData) =>
        setGroupNotes(newData))
      .then(() => update({
        type: "",
        title: "",
        text: "",
        relDate: "",
        postedOn: ""
      })
    )
}

  return (
    <>
      <Button color="primary" onClick={toggleModal}>
        Create Note
      </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Create New Note</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Type"
              value={note.type}
              onChange={(e) => {
                const copy = { ...note }
                copy.type = e.target.value
                update(copy)
              }} />
            <Input
              type="text"
              placeholder="Title"
              value={note.title}
              onChange={(e) => {
                const copy = { ...note }
                copy.title = e.target.value
                update(copy)
              }}
            />
            <Input
              type="textarea"
              placeholder="Text"
              value={note.text}
              onChange={(e) => {
                const copy = { ...note }
                copy.text = e.target.value
                update(copy)
              }}
            />
            <Input
              type="date"
              placeholder="Relevant Date"
              value={note.relDate}
              onChange={(e) => {
                const copy = { ...note }
                copy.relDate = e.target.value
                update(copy)
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={(clickEvent) => handleSubmit(clickEvent)}>
              Create
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

