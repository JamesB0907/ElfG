import React, { useState, useEffect } from 'react'
import { GroupList } from './GroupList'
import { UserGroupList } from './UserGroupList'
import { getAllGroups } from '../managers/GroupManager'
import { getGroupsByUserId } from '../managers/UserManager'
import { GroupForm } from './GroupForm'
import './GroupPage.css'

const initialState = {
  groups: [],
  userGroups:[],
}

export const Context = React.createContext(initialState)

export const GroupPage = () => {
  const [allGroups, setAllGroups] = useState(initialState.groups)
  const [userGroups, setUserGroups] = useState(initialState.userGroups)
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
    <Context.Provider value={{allGroups, setAllGroups, userGroups, setUserGroups}}>
    <div className='group-container'>
      <GroupForm className='group-form' setGroups={setAllGroups}/>
      <GroupList 
      allGroups={allGroups} 
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
