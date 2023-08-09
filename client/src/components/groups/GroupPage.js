import React, { useState, useEffect } from 'react'
import { GroupList } from './GroupList'
import { UserGroupList } from './UserGroupList'
import { getAllGroups } from '../managers/GroupManager'
import { getGroupsByUserId } from '../managers/UserManager'

export const GroupPage = () => {
  const [allGroups, setAllGroups] = useState([])
  const [userGroups, setUserGroups] = useState([])
  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getAllGroups().then((data) => setAllGroups(data));
  }, [])

  useEffect(() => {
    if (loggedInUser) {
      getGroupsByUserId(loggedInUser.id).then((userGroups) => setUserGroups(userGroups))
    }
  }, [])

  return (
    <div>
      <GroupList 
      groups={allGroups} 
      userGroups={userGroups}
      />
      {<UserGroupList 
      userGroups={userGroups}
      />}
    </div>
  )
}
