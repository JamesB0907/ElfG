import React from 'react';
import { GroupSession } from './GroupSession';

export const GroupSessionList = ({ sessions }) => {
  return (
    <div>
      <h4>Group Sessions</h4>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <GroupSession key={session.id} session={session} />
        ))
      ) : (
        <p>No current sessions.</p>
      )}
    </div>
  );
};
