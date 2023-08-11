import React, { useState, useEffect } from 'react'
import { GroupList } from './GroupList'
import { UserGroupList } from './UserGroupList'
import { getAllGroups } from '../managers/GroupManager'
import { getGroupsByUserId } from '../managers/UserManager'
import { GroupForm } from './GroupForm'

export const Context = React.createContext()

export const GroupPage = () => {
  const [allGroups, setAllGroups] = useState([])
  const [userGroups, setUserGroups] = useState([])
  const loggedInUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getAllGroups()
      .then((data) => 
        setAllGroups(data));
  }, [])

  useEffect(() => {
    if (loggedInUser) {
      getGroupsByUserId(loggedInUser.id)
        .then((userGroups) => 
          setUserGroups(userGroups))
    }
  }, [])

  return (
  <>
    <Context.Provider value={[allGroups, setAllGroups]}>
    <div>
      <GroupForm setGroups={setAllGroups}/>
      <GroupList 
      groups={allGroups} 
      userGroups={userGroups}
      setAllGroups={setAllGroups}
      />
      {<UserGroupList 
      userGroups={userGroups}
      setUserGroups={setUserGroups}
      setAllGroups={setAllGroups}
      />}
    </div>
      </Context.Provider>
  </>
  )
}
