import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export const GroupNote = ({ note }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{note.title}</CardTitle>
        <CardText>{note.text}</CardText>
      </CardBody>
    </Card>
  );
};
