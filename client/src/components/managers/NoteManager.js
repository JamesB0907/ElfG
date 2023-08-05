const baseUrl = '/api/groupnote'; 

export const getAllGroupNotes = () => {
  return fetch(baseUrl)
    .then((response) => response.json());
}

export const getGroupNotesByGroupId = (groupId) => {
  return fetch(`${baseUrl}/GroupBy/${groupId}`)
    .then((response) => response.json());
}

export const addGroupNote = (groupNote) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupNote)
  })
  .then((response) => response.json());
}

export const deleteGroupNote = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
  .then((response) => response.json());
}

export const editGroupNote = (id, groupNote) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(groupNote)
  })
  .then((response) => response.json());
}
