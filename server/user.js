const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name && user.room === room);

    console.log("add", users);

    if (existingUser) {
        return { error : "User is taken" };
    }

    const user = { id, name, room }
    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.slice(index, 1)[0];
    }
    console.log("remove", users);
}

const getUser = (id) =>{
    console.log('get', users);
    console.log("id", id) 
    return users.find((user) => user.id === id);
}

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom }