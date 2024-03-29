
const baseUrl = '/api/user'; 

export const login = (userObject) => {
  return fetch(`${baseUrl}/getbyemail?email=${userObject.email}`)
  .then((response) => response.json())
  .then((user) => {
    if (user && user.id){
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
    window.location.href = '/login'
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

export const register = (userObject) => {
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
  }

  export const getGroupsByUserId = (userId) => {
    return fetch(`${baseUrl}/${userId}/groups`)
      .then((response) => response.json());
  }

  export const getSessionsByUserId = (currentUserId) => {
    return fetch(`${baseUrl}/${currentUserId}/sessions`)
      .then((response) => response.json());
  }

  export const joinGroup = (groupMembershipObject) => {
    return fetch(`${baseUrl}/${groupMembershipObject.UserId}/join-group/${groupMembershipObject.GroupId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(groupMembershipObject),
})
    .then((response) => response.json())
  }

  export const leaveGroup = (groupMembershipObject) => {
    return fetch(`${baseUrl}/${groupMembershipObject.userId}/leave-group/${groupMembershipObject.groupId}`, {
      method: 'DELETE'
    })
  }

  export const joinSession = (sessionAttendee) => {
    return fetch(`${baseUrl}/${sessionAttendee.UserId}/join-session/${sessionAttendee.sessionId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionAttendee),
    })
    .then((response) => response.json())
  }

  export const leaveSession = (sessionAttendee) => {
    return fetch(`${baseUrl}/${sessionAttendee.userId}/leave-session/${sessionAttendee.sessionId}`, {
      method: 'DELETE'
    })
  }



