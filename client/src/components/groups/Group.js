import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { getGroupsByUserId, joinGroup, leaveGroup } from '../managers/UserManager'
import { deleteGroup, getAllGroups } from '../managers/GroupManager'
import { GroupEdit } from './GroupEdit'
import { Context } from './GroupPage'
import './Group.css';

export const Group = ({ group, hasUserJoined }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const { allGroups, setAllGroups, userGroups, setUserGroups } = useContext(Context)

  const handleJoinGroup = () => {

    const membershipData = {
      UserId: currentUser.id,
      GroupId: group.id
    }

    joinGroup(membershipData)
    .then(() => getAllGroups())
    .then((newGroups) => setAllGroups(newGroups))
    .then(() => getGroupsByUserId(currentUser.id))
    .then((newUserGroups) => setUserGroups(newUserGroups))
  }

  const handleLeaveGroup = () => {
    const groupMembershipObject = {
      userId: currentUser.id,
      groupId: group.id
    }
    leaveGroup(groupMembershipObject)
    .then(() => getAllGroups())
    .then((newGroups) => setAllGroups(newGroups))
    .then(() => getGroupsByUserId(currentUser.id))
    .then((newUserGroups) => setUserGroups(newUserGroups))
  }

  const handleDeleteGroup = () => {
    deleteGroup(group.id)
    .then(() => getAllGroups())
    .then((newGroups) => setAllGroups(newGroups))
    .then(() => getGroupsByUserId(currentUser.id))
    .then((newUserGroups) => setUserGroups(newUserGroups))
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

  const deleteButton = (
    <Button color="danger" onClick={handleDeleteGroup}>
      Delete Group
    </Button>
  )

  return (
    <Card className="group-card">
      <CardBody>
        <CardTitle>
          {hasUserJoined ? (
            <Link to={`/groups/${group.id}`} className="group-name">{group.name}</Link>
          ) : (
            <span className="group-name">{group.name}</span>
          )}
        </CardTitle>
        <CardText className="group-description">{group.description}</CardText>
        {hasUserJoined ? (
          <>
            {currentUser.userTypeId === 2 && currentUser.id === group.userId && deleteButton}
            {currentUser.userTypeId === 3 && deleteButton}
            <GroupEdit 
            group={group}
            setAllGroups={setAllGroups}/>
            {leaveButton}
          </>
        ) : (
          joinButton
        )}
      </CardBody>
    </Card>
  )
}
