import { format, formatISO, parseISO } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button, Container } from 'reactstrap'
import { deleteGroupSession, getAllGameTypes, getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionEdit } from './GroupSessionEdit'
import { getSessionsByUserId, joinSession, leaveSession } from '../managers/UserManager'
import { SessionContext } from '../groups/GroupDetails'
import './GroupSession.css'

export const GroupSession = ({ session, groupId, hasJoined }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const isUserSession = session.userId === currentUser.id
    const isAdmin = currentUser.userTypeId === 3
    const [gameTypes, setGameTypes] = useState([])
    
    const { groupSessions, setGroupSessions, userSessions, setUserSessions } = useContext(SessionContext)
    
    const createDateTime = new Date(session.date)
    const formattedDate = createDateTime.toLocaleDateString()
    const handleDeleteSession = () => {
        deleteGroupSession(session.id)
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newSessions) => setGroupSessions(newSessions))
            .then(() => getSessionsByUserId(currentUser.id))
            .then((newSessions) => setUserSessions(newSessions))
    }

    const handleJoinSession = () => {
        const groupAttendeeData = {
            userId: currentUser.id,
            sessionId: session.id
        }
        joinSession(groupAttendeeData)
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newSessions) => setGroupSessions(newSessions))
            .then(() => getSessionsByUserId(currentUser.id))
            .then((newSessions) => setUserSessions(newSessions))
    }

    const handleLeaveSession = () => {
        const sessionAttendeeObject = {
            userId: currentUser.id,
            sessionId: session.id
        }
        leaveSession(sessionAttendeeObject)
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newSessions) => setGroupSessions(newSessions))
            .then(() => getSessionsByUserId(currentUser.id))
            .then((newSessions) => setUserSessions(newSessions))
    }

    const leaveButton = (
        <Button className='leave-button' color="secondary" onClick={handleLeaveSession}>
            Joined!
        </Button>
    )

    const joinButton = (
        <Button className='join-button' color="success" onClick={handleJoinSession}>
            Join Session!
        </Button>
    )
    
    useEffect(() => {
        getAllGameTypes()
            .then((gameTypes) => {
              setGameTypes(gameTypes)
            }) 
      }, [])
    
    const foundGameType = gameTypes.find((gameType) => gameType.id === session.gameTypeId)

    return (
        <Card className='session-container'>
            <CardBody className='session-card'>
                <CardTitle className='session-location'>Location: {session.location}</CardTitle>
                <CardTitle className='session-notes'>Notes: {session.notes}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Date: {formattedDate}</ListGroupItem>
                    <ListGroupItem>Start Time: {session.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {session.endTime}</ListGroupItem>
                    <ListGroupItem>Game Type: {foundGameType?.name}</ListGroupItem>
                </ListGroup>
                {hasJoined ? (leaveButton) : (joinButton)}
                {(isUserSession && (
                    <>
                        <Button color="secondary" className='delete-button' onClick={handleDeleteSession}>Delete</Button>
                        <GroupSessionEdit
                            groupId={groupId}
                            setGroupSessions={setGroupSessions}
                            session={session} />
                    </>
                )) || (isAdmin && (
                    <>
                        <Button color="secondary" className='delete-button' onClick={handleDeleteSession}>Delete</Button>
                        <GroupSessionEdit
                            groupId={groupId}
                            setGroupSessions={setGroupSessions}
                            session={session} />
                    </>
                ))}
            </CardBody>
        </Card>
    )
}
