const baseUrl = '/api/groupsession'

export const getAllGroupSessions = () => {
  return fetch(baseUrl)
    .then((response) => response.json());
}

export const getAllGameTypes = () => {
  return fetch(`${baseUrl}/GetGameTypes`)
    .then((response) => response.json())
}

export const getGroupSessionById = (id) => {
  return fetch(`${baseUrl}/${id}`)
    .then((response) => response.json())
}

export const getGroupSessionsByGroupId = (groupId) => {
  return fetch(`${baseUrl}/GroupBy/${groupId}`)
    .then((response) => response.json())
}

export const addGroupSession = (groupSession) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupSession)
  })
  .then((response) => response.json())
}

export const editGroupSession = (id, groupSession) => {
  return fetch(`${baseUrl}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupSession)
  })
  .then((response) => response.json());
}

export const deleteGroupSession = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
}
