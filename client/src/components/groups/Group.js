import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

export const Group = ({ group }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <Link to={`/groups/${group.id}`}>{group.name}</Link>
                </CardTitle>
                <CardText>{group.description}</CardText>
            </CardBody>
        </Card>
    )
}

