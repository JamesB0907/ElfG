const baseUrl = '/api/group'; 

export const getAllGroups = () => {
  return fetch(baseUrl)
    .then((response) => response.json());
}

export const getGroupById = (id) => {
  return fetch(`${baseUrl}/${id}`)
    .then((response) => response.json())
}

export const addGroup = (group) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(group)
  })
  .then((response) => response.json())
}

export const deleteGroup = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
}

export const editGroup = (group) => {
  return fetch(`${baseUrl}?id=${group.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(group)
  })
}
