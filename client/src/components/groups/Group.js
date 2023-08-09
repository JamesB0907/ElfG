import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { joinGroup, leaveGroup } from '../managers/UserManager'; // Import the joinGroup and leaveGroup functions

export const Group = ({ group, loggedInUser, hasUserJoined }) => {
  const handleJoinGroup = () => {
    joinGroup(loggedInUser.id, group.id)
      .then((response) => {
        console.log(`Joined group with ID ${group.id}`);
      })
      .catch((error) => {
        console.error('Error joining group:', error);
      })
  }

  const handleLeaveGroup = () => {
    leaveGroup(loggedInUser.id, group.id)
      .then((response) => {
        console.log(`Left group with ID ${group.id}`);
      })
      .catch((error) => {
        console.error('Error leaving group:', error);
      })
  }

  const joinButton = (
    <Button color="primary" onClick={handleJoinGroup}>
      Join Group
    </Button>
  )

  const leaveButton = (
    <Button color="danger" onClick={handleLeaveGroup}>
      Leave Group
    </Button>
  )

  return (
    <Card>
      <CardBody>
        <CardTitle>
          {hasUserJoined ? (
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
          ) : (
            group.name
          )}
        </CardTitle>
        <CardText>{group.description}</CardText>
        {hasUserJoined ? leaveButton : joinButton}
      </CardBody>
    </Card>
  )
}
