import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { addGroupSession, getAllGameTypes, getAllGroupSessions, getGroupSessionsByGroupId } from '../managers/GroupSessionManager'

export const GroupSessionForm = ({ setGroupSessions, groupId }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))

    const [modalOpen, setModalOpen] = useState(false)
    const [groupSession, updateGroupSession] = useState({
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        gameTypeId: null,
        date: '',
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

        const newGroupSession = {
            userId: currentUser.id,
            groupId: groupId,
            startTime: groupSession.startTime,
            endTime: groupSession.endTime,
            location: groupSession.location,
            notes: groupSession.notes,
            gameTypeId: groupSession.gameTypeId,
            date: groupSession.date,
        }

        addGroupSession(newGroupSession)
            .then(() => toggleModal())
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newData) => setGroupSessions(newData))
            .then(() => updateGroupSession({
                startTime: '',
                endTime: '',
                location: '',
                notes: '',
                gameTypeId: null,
                date: '',
            })
        )
    }

    const handleDropdownSelect = (selectedGameTypeId) => {
        updateGroupSession({ ...groupSession, gameTypeId: selectedGameTypeId })
    }

    const gameTypeOptions = gameTypes.map((gameType) => (
        <DropdownItem
            key={gameType.id}
            onClick={() => handleDropdownSelect(gameType.id)}
        >
            {gameType.name}
        </DropdownItem>
    ))

    return (
        <>
            <Button color="primary" onClick={toggleModal}>
                Create Group Session
            </Button>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <form onSubmit={handleSubmit}>
                    <ModalHeader toggle={toggleModal}>Create New Group Session</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="startTime">Start Time</Label>
                            <Input
                                type="datetime-local"
                                id="startTime"
                                value={groupSession.startTime}
                                onChange={(e) => {
                                    const copy = { ...groupSession }
                                    copy.startTime = e.target.value
                                    updateGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="endTime">End Time</Label>
                            <Input
                                type="datetime-local"
                                id="endTime"
                                value={groupSession.endTime}
                                onChange={(e) => {
                                    const copy = { ...groupSession }
                                    copy.endTime = e.target.value
                                    updateGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                value={groupSession.location}
                                onChange={(e) => {
                                    const copy = { ...groupSession }
                                    copy.location = e.target.value
                                    updateGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Notes</Label>
                            <Input
                                type="textarea"
                                id="notes"
                                value={groupSession.notes}
                                onChange={(e) => {
                                    const copy = { ...groupSession }
                                    copy.notes = e.target.value
                                    updateGroupSession(copy)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gameType">Game Type</Label>
                            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                <DropdownToggle caret>
                                    {groupSession.gameTypeId !== null
                                        ? gameTypes.find((type) => type.id === groupSession.gameTypeId).name
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
                                value={groupSession.date}
                                onChange={(e) => {
                                    const copy = { ...groupSession }
                                    copy.date = e.target.value
                                    updateGroupSession(copy)
                                }}
                            />
                        </FormGroup>
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
    )
}
