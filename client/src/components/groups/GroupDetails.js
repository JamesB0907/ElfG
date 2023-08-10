import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getGroupSessionsByGroupId } from '../managers/GroupSessionManager'
import { GroupSessionList } from '../groupSessions/GroupSessionList'
import { Container } from 'reactstrap'
import { format } from 'date-fns'
import { getGroupNotesByGroupId } from '../managers/NoteManager'
import { GroupNoteList } from '../notes/GroupNoteList'

export const GroupDetails = () => {
  const { groupId } = useParams()
  const [groupSessions, setGroupSessions] = useState([])
  const [groupNotes, setGroupNotes] = useState([])

  useEffect(() => {
    getGroupSessionsByGroupId(groupId)
      .then((sessions) => {
        setGroupSessions(sessions)
      })
      .catch((error) => {
        console.error('Error fetching group sessions:', error)
      });

    getGroupNotesByGroupId(groupId)
      .then((notes) => {
        setGroupNotes(notes)
      })
      .catch((error) => {
        console.error('Error fetching group notes:', error)
      })
  }, [groupId])

  return (
    <Container> 
      <GroupSessionList 
      sessions={groupSessions}
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
  )
}
