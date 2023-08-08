import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

export const Group = ({ group, hasUserJoined }) => {

    // const hasJoinedGroup = userGroups.some((userGroup) => userGroup.id === group.id)

    return (
        <Card>

            <CardBody>
                <CardTitle>
                {hasUserJoined ? <Link to={`/groups/${group.id}`}>{group.name}</Link>
                : <strong>{group.name}</strong>}
                </CardTitle>
                <CardText>{group.description}</CardText>
            </CardBody>
        </Card>

    )
}

