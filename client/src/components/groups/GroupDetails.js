import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionList } from '../groupSessions/GroupSessionList'
import { Container } from 'reactstrap'
import { getGroupNotesByGroupId } from '../managers/NoteManager'
import { GroupNoteList } from '../notes/GroupNoteList'
import { getSessionsByUserId } from '../managers/UserManager'
import { GroupSessionForm } from '../groupSessions/GroupSessionForm'
import { UserSessionList } from '../groupSessions/UserSessionList'

const sessionsInitialState ={
  groupSessions:[],
  userSessions:[]
}

export const SessionContext = React.createContext(sessionsInitialState)

export const GroupDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { groupId } = useParams()
  const [groupSessions, setGroupSessions] = useState(sessionsInitialState.groupSessions)
  const [userSessions, setUserSessions] = useState(sessionsInitialState.userSessions)
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
    }, [])
    
    useEffect(() => {
      if (currentUser) {
        getSessionsByUserId(currentUser.id)
          .then((groupSessions) => {
            setUserSessions(groupSessions)
          }) 
      }
    }, [])

  return (

    <SessionContext.Provider value={{groupSessions, setGroupSessions, userSessions, setUserSessions}}>
    <Container>
      <GroupSessionForm 
      groupId={groupId}
      
      />
      <UserSessionList 
      groupId={groupId}
      userSessions={userSessions}
      />
      <GroupSessionList 
      groupId={groupId}
      />
      <GroupNoteList 
      notes={groupNotes}
      groupId={groupId}
      setGroupNotes={setGroupNotes}
      />
    </Container>
    </SessionContext.Provider>
  )
}
