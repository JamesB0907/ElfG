import { format } from 'date-fns'
import React from 'react'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { deleteGroupSession, getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionEdit } from './GroupSessionEdit'

export const GroupSession = ({ session, groupId, setGroupSessions }) => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const isUserSession = session.userId === currentUser.id
    const isAdmin = currentUser.userTypeId === 3

    const handleDeleteSession = () => {
        deleteGroupSession(session.id)
            .then(() => getGroupSessionsByGroupId(groupId))
            .then((newData) => setGroupSessions(newData))
    }

    const deleteButton = () => {
        <Button color="danger" onClick={handleDeleteSession}>
            Delete Session
        </Button>
    }
    return (
        <Card>
            <CardBody>
                <CardTitle>Location: {session.location}</CardTitle>
                <CardTitle>Notes: {session.notes}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Date: {format(new Date(session.date), 'MMMM d, yyyy')}</ListGroupItem>
                    <ListGroupItem>Start Time: {session.startTime}</ListGroupItem>
                    <ListGroupItem>End Time: {session.endTime}</ListGroupItem>
                    <ListGroupItem>Game Type: {session.gameType.name}</ListGroupItem>
                    {(isUserSession && (
                        <>
                            <Button color="danger" onClick={handleDeleteSession}>Delete</Button>
                            <GroupSessionEdit
                            groupId={groupId}
                            setGroupSessions={setGroupSessions}
                            session={session}/>
                        </>
                    )) || (isAdmin && (
                        <>
                        <Button color="danger" onClick={handleDeleteSession}>Delete</Button>
                        <GroupSessionEdit
                        groupId={groupId}
                        setGroupSessions={setGroupSessions}
                        session={session}/>
                        </>
                    ))}

                </ListGroup>
            </CardBody>
        </Card>
    )
}
