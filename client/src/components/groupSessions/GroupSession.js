import { format, formatISO, parseISO } from 'date-fns'
import React, { useContext } from 'react'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button, Container } from 'reactstrap'
import { deleteGroupSession, getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionEdit } from './GroupSessionEdit'
import { getSessionsByUserId, joinSession, leaveSession } from '../managers/UserManager'
import { SessionContext } from '../groups/GroupDetails'

export const GroupSession = ({ session, groupId, hasJoined }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const isUserSession = session.userId === currentUser.id
    const isAdmin = currentUser.userTypeId === 3

    const { groupSessions, setGroupSessions, userSessions, setUserSessions } = useContext(SessionContext)

    const handleDeleteSession = () => {
        deleteGroupSession(session.id)
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newSessions) => setGroupSessions(newSessions))
            .then(() => getSessionsByUserId(currentUser.id))
            .then((newSessions) => setUserSessions(newSessions))
    }

    const deleteButton = () => {
        <Button color="danger" onClick={handleDeleteSession}>
            Delete Session
        </Button>
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
        <Button color="secondary" onClick={handleLeaveSession}>
            Joined!
        </Button>
    )

    const joinButton = (
        <Button color="success" onClick={handleJoinSession}>
            Join Session!
        </Button>
    )

    return (
        <Card>
            <CardBody>
                <CardTitle>Location: {session.location}</CardTitle>
                <CardTitle>Notes: {session.notes}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Date: {session.date}</ListGroupItem>
                    <ListGroupItem>Start Time: {session.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {session.endTime}</ListGroupItem>
                    <ListGroupItem>Game Type: {session?.gameType?.name}</ListGroupItem>
                </ListGroup>
                {hasJoined ? (leaveButton) : (joinButton)}
                {(isUserSession && (
                    <>
                        <Button color="secondary" onClick={handleDeleteSession}>Delete</Button>
                        <GroupSessionEdit
                            groupId={groupId}
                            setGroupSessions={setGroupSessions}
                            session={session} />
                    </>
                )) || (isAdmin && (
                    <>
                        <Button color="secondary" onClick={handleDeleteSession}>Delete</Button>
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
