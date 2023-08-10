import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { addGroup, getAllGroups } from '../managers/GroupManager'

export const GroupForm = ({ setGroups }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const [modalOpen, setModalOpen] = useState(false);
  const [group, updateGroup] = useState({
    name: '',
    description: '',
  })

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newGroup = {
      name: group.name,
      description: group.description,
      userId: currentUser.id,
    }

    addGroup(newGroup)
    .then(() => toggleModal())
    .then(() => getAllGroups())
    .then((newData) =>
      setGroups(newData))
    .then(() => updateGroup({
        name: '',
        description: '',
    })
  )
}
  const isGmOrAdmin = currentUser.userTypeId === 2 || currentUser.userTypeId === 3;

  return (
    <>
      {isGmOrAdmin && (
        <Button color="primary" onClick={toggleModal}>
          Create Group
        </Button>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggleModal}>Create New Group</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Name"
              value={group.name}
              onChange={(e) => {
                const copy = { ...group }
                copy.name = e.target.value
                updateGroup(copy)
              }}
            />
            <Input
              type="textarea"
              placeholder="Description"
              value={group.description}
              onChange={(e) => {
                const copy = { ...group }
                copy.description = e.target.value
                updateGroup(copy)
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Create
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};
