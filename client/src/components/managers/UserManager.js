const baseUrl = '/api/user'; 

  export const login = (userObject) => {
    return fetch(`${baseUrl}/getbyemail?email=${userObject.email}`)
      .then((response) => response.json())
      .then((user) => {
        if (user && user.id && user.isActive){
          localStorage.setItem("user", JSON.stringify(user))
          return user
        } else {
          throw new Error("Invalid email or account deactivated")
        }
      })
      .catch((error) => {
        throw new Error("Invalid email or account deactivated")
      })
  }

  export const logout = () => {
    localStorage.clear()
}

export const getUserStatus = (email) => {
  return fetch(`${baseUrl}/getbyemail?email=${email}`)
    .then((response) => response.json())
}

  export const getAllUsers = () => {
    return fetch(baseUrl)
      .then((response) => response.json());
  }

  export const getUserById = (id) => {
    return fetch(`${baseUrl}/${id}`)
      .then((response) => response.json());
  }

export const register = () => {
  return fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
  .then((response) => response.json())
    .then((savedUser) => {
      localStorage.setItem("user", JSON.stringify(savedUser))
    })
}

  export const editUser = (id, user) => {
    return fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => response.json());
  }

  export const deleteUser = (id) => {
    return fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })
    .then((response) => response.json());
  }

  export const getGroupsByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}/groups`)
      .then((response) => response.json());
  }

  export const getSessionsByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}/sessions`)
      .then((response) => response.json());
  }

  export const joinGroup = (userId, groupId) => {
    return fetch(`${baseUrl}/${userId}/join-group/${groupId}`, {
      method: 'POST'
    })
    .then((response) => response.json());
  }

  export const leaveGroup = (userId, groupId) => {
    return fetch(`${baseUrl}/${userId}/leave-group/${groupId}`, {
      method: 'POST'
    })
    .then((response) => response.json());
  }

  export const joinSession = (userId, sessionId) => {
    return fetch(`${baseUrl}/${userId}/join-session/${sessionId}`, {
      method: 'POST'
    })
    .then((response) => response.json());
  }

  export const leaveSession = (userId, sessionId) => {
    return fetch(`${baseUrl}/${userId}/leave-session/${sessionId}`, {
      method: 'POST'
    })
    .then((response) => response.json());
  }



