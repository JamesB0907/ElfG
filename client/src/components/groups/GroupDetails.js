import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionList } from '../groupSessions/GroupSessionList'
import { Container } from 'reactstrap'
import { format } from 'date-fns'
import { getGroupNotesByGroupId } from '../managers/NoteManager'
import { GroupNoteList } from '../notes/GroupNoteList'
import { getSessionsByUserId } from '../managers/UserManager'

const sessionsInitialState ={
  groupSessions:[],
  userSessions:[]
}

export const SessionContext = React.createContext(sessionsInitialState)

export const GroupDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { groupId } = useParams()
  const [groupSessions, setGroupSessions] = useState([sessionsInitialState.groupSessions])
  const [userSessions, setUserSessions] = useState([sessionsInitialState.userSessions])
  const [groupNotes, setGroupNotes] = useState([])

  useEffect(() => {
    getGroupSessionsByGroupId(groupId)
      .then((sessions) => {
        setGroupSessions(sessions)
      })

    getGroupNotesByGroupId(groupId)
      .then((notes) => {
        setGroupNotes(notes)
      })
  }, [groupId])

  useEffect(() => {
    if (currentUser) {
      getSessionsByUserId(currentUser.id)
        .then((userSessions) => {
          const filteredUserSessions =  userSessions.filter((session) => session.groupId === groupId)
          setUserSessions(filteredUserSessions)
        })
    }
  }, [])
console.log(userSessions)
  return (

    <SessionContext.Provider value={{groupSessions, setGroupSessions, userSessions, setUserSessions}}>
    <Container> 
      <GroupSessionList 
      groupId={groupId}
      setGroupSessions={setGroupSessions}
      />
      <GroupNoteList 
      notes={groupNotes}
      groupId={groupId}
      setGroupNotes={setGroupNotes}
      />
        <Outlet />
    </Container>
    </SessionContext.Provider>
  )
}
