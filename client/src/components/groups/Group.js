import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'

export const Group = ({ group }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><b><em>{group.name}</em></b></CardTitle>
        <CardText>{group.description}</CardText>
      </CardBody>
    </Card>
  )
}

