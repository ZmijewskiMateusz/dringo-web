import axios from "axios";
import { authHeader } from "@/_helpers";
import $socket from "@/_helpers/socket-instance";
const state = {
  rooms: [],
  currentRoom: null,
};
const actions = {
  fetchRooms({ commit }) {
    axios
      .get(`${process.env.VUE_APP_API_URL}/rooms`, { headers: authHeader() })
      .then((response) => commit("FETCH_ROOMS", response.data));
  },
  socket_joinedRoom({ commit }, roomId) {
    return state.rooms
      .filter((room) => room.id == roomId)
      .then((room) => {
        commit("SOCKET_JOINEDROOM", room);
      });
  },

  emitJoinRoom(data) {
    $socket.emit("joinRoom", data);
  },
};

const mutations = {
  FETCH_ROOMS(state, rooms) {
    state.rooms = rooms;
  },
  SOCKET_JOINEDROOM(state, room) {
    state.currentRoom = room;
  },
};

export const room = {
  namespaced: true,
  state,
  actions,
  mutations,
};
