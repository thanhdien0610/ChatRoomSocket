const listUsers = [];

function userJoin(id, nameUser) {
    const user = { id, nameUser };
    listUsers.push(user);
    return user;
}

function userLeave(id) {
    const index = listUsers.findIndex(user => user.id === id);
    if (index !== -1) {
        return listUsers.splice(index, 1)[0];
    }
}

function getCurrentUser(nameUser) {
    return listUsers.find(user => user.nameUser === nameUser);
}

function getUserById(id) {
    return listUsers.find(user => user.id === id);
}

// function getRoomUsers(room) {
//     return listUsers.filter(user => user.room === room);
//   }

module.exports = {
    userJoin,
    listUsers,
    userLeave,
    getCurrentUser,
    getUserById,

}