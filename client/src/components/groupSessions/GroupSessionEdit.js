import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { editGroupSession, getAllGameTypes, getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { getSessionsByUserId } from '../managers/UserManager'
import { SessionContext } from '../groups/GroupDetails'
import './GroupSessionEdit.css'

export const GroupSessionEdit = ({ groupId, session }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))

    const { groupSessions, setGroupSessions, userSessions, setUserSessions } = useContext(SessionContext)

    const [modalOpen, setModalOpen] = useState(false)
    const [editedGroupSession, updateEditedGroupSession] = useState({
        userId: currentUser.id,
        groupId: parseInt(groupId),
        startTime: session.startTime,
        endTime: session.endTime,
        location: session.location,
        notes: session.notes,
        gameTypeId: null,
        date: session.date
    })
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [gameTypes, setGameTypes] = useState([])

    const toggleModal = () => {
        setModalOpen(!modalOpen)
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    useEffect(() => {
        getAllGameTypes()
            .then((data) => {
                setGameTypes(data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const saveSession = { ...editedGroupSession }
        saveSession.id = session.id
        editGroupSession(saveSession)
            .then(() => toggleModal())
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newData) => setGroupSessions(newData))
            .then(() => getSessionsByUserId(currentUser.id))
            .then((newData) => setUserSessions(newData))

    }

    const handleDropdownSelect = (selectedGameTypeId) => {
        updateEditedGroupSession({ ...editedGroupSession, gameTypeId: selectedGameTypeId })
    }

    const gameTypeOptions = gameTypes.map((gameType) => (
        <DropdownItem
            key={gameType.id}
            onClick={() => handleDropdownSelect(gameType.id)}
        >
            {gameType.name}
        </DropdownItem>
    ))
    const editButton = (
        <Button className='session-edit-button' color="success" onClick={toggleModal}>
            Edit Group Session
        </Button>
    )
    return (
        <>
            {currentUser.userTypeId === 2 && currentUser.id === session.userId && editButton}
            {currentUser.userTypeId === 3 && editButton}
            <Modal className='session-edit-modal' isOpen={modalOpen} toggle={toggleModal}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggleModal}>Create New Group Session</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="startTime">Start Time</Label>
                            <Input
                                type="text"
                                id="startTime"
                                value={editedGroupSession.startTime}
                                onChange={(e) => {
                                    const copy = { ...editedGroupSession }
                                    copy.startTime = e.target.value
                                    updateEditedGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="endTime">End Time</Label>
                            <Input
                                type="text"
                                id="endTime"
                                value={editedGroupSession.endTime}
                                onChange={(e) => {
                                    const copy = { ...editedGroupSession }
                                    copy.endTime = e.target.value
                                    updateEditedGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                value={editedGroupSession.location}
                                onChange={(e) => {
                                    const copy = { ...editedGroupSession }
                                    copy.location = e.target.value
                                    updateEditedGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Notes</Label>
                            <Input
                                type="textarea"
                                id="notes"
                                value={editedGroupSession.notes}
                                onChange={(e) => {
                                    const copy = { ...editedGroupSession }
                                    copy.notes = e.target.value
                                    updateEditedGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gameType">Game Type</Label>
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle caret>
                                    {editedGroupSession.gameTypeId !== null
                                        ? gameTypes.find((type) => type.id === editedGroupSession.gameTypeId).name
                                        : 'Select Game Type'}
                                </DropdownToggle>
                                <DropdownMenu>{gameTypeOptions}</DropdownMenu>
                            </Dropdown>
                        </FormGroup>
                        <FormGroup>
                            <Label for="date">Date</Label>
                            <Input
                                type="date"
                                id="date"
                                value={editedGroupSession.date}
                                onChange={(e) => {
                                    const copy = { ...editedGroupSession }
                                    copy.date = e.target.value
                                    updateEditedGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">
                            Save Edits
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
