import { format } from 'date-fns'
import React from 'react'
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap'

export const GroupSession = ({ session }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>Location: {session.location}</CardTitle>
                <CardTitle>Notes: {session.notes}</CardTitle>
                <ListGroup>
                    <ListGroupItem>Date: {format(new Date(session.date), 'MMMM d, yyyy')}</ListGroupItem>
                    <ListGroupItem>Start Time: {format(new Date(session.startTime), 'p')}</ListGroupItem>
                    <ListGroupItem>End Time: {format(new Date(session.endTime), 'p')}</ListGroupItem>
                    <ListGroupItem>Game Type: {session.gameType.name}</ListGroupItem>
                </ListGroup>
            </CardBody>
        </Card>
    )
}
