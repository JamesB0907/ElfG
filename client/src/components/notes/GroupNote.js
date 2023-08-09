import { format } from 'date-fns';
import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export const GroupNote = ({ note }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle><strong>{note.title}</strong></CardTitle>
        <CardText>Note Type: {note.type}</CardText>
        <CardText>{note.text}</CardText>
        <CardText>Relevant Date: {format(new Date(note.relDate), 'MMMM d, yyyy')}</CardText>
      </CardBody>
    </Card>
  )
}
