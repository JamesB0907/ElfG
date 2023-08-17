import React, { useContext, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap'
import { editGroup, getAllGroups } from '../managers/GroupManager'
import { getGroupsByUserId, joinGroup } from '../managers/UserManager'
import { Context } from './GroupPage'

export const GroupEdit = ({ group }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const { allGroups, setAllGroups, userGroups, setUserGroups } = useContext(Context)

  const [modalOpen, setModalOpen] = useState(false);
  const [editedGroup, updateEditedGroup] = useState({
    userId: currentUser.id,
    name: group.name,
    description: group.description
  })

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const saveGroup = { ...editedGroup }
    saveGroup.id = group.id
    editGroup(saveGroup)
    .then(() => toggleModal())
    .then(() => getAllGroups())
    .then((newGroups) => setAllGroups(newGroups))
    .then(() => getGroupsByUserId(currentUser.id))
    .then((newUserGroups) => setUserGroups(newUserGroups))
}
  const isGmOrAdmin = currentUser.userTypeId === 2 || currentUser.userTypeId === 3;

  const editButton = (
    <Button color="primary" onClick={toggleModal}>
    Edit Group
  </Button>
  )

  return (
    <>
            {currentUser.userTypeId === 2 && currentUser.id === group.userId && editButton}
            {currentUser.userTypeId === 3 &&  editButton}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Edit Group</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Name"
              value={editedGroup.name}
              onChange={(e) => {
                const copy = { ...editedGroup }
                copy.name = e.target.value
                updateEditedGroup(copy)
              }}
            />
            <Input
              type="textarea"
              placeholder="Description"
              value={editedGroup.description}
              onChange={(e) => {
                const copy = { ...editedGroup }
                copy.description = e.target.value
                updateEditedGroup(copy)
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
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
