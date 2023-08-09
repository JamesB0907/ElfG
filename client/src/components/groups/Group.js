import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { joinGroup, leaveGroup } from '../managers/UserManager'; // Import the joinGroup and leaveGroup functions
import { getAllGroups } from '../managers/GroupManager';

export const Group = ({ group, hasUserJoined, setAllGroups }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()


  const handleJoinGroup = () => {

    const membershipData = {
      UserId: currentUser.id,
      GroupId: group.id
    }

    joinGroup(membershipData)
      .then(navigate("/"))
  }

  const handleLeaveGroup = () => {
    
    const groupMembershipObject = {
      userId: currentUser.id,
      groupId: group.id
    }
    leaveGroup(groupMembershipObject)
      .then(navigate("/"))
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
