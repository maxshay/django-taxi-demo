import axios from "axios";
import { share } from "rxjs/operators"; // new
import { webSocket } from "rxjs/webSocket"; // new

import { getAccessToken } from "./AuthService";
import config from "../config";

let _socket; // new
export let messages; // new

// new
export const connect = () => {
  if (!_socket || _socket.closed) {
    const token = getAccessToken();
    _socket = webSocket(`${config.baseWsUrl}/taxi/?token=${token}`);
    messages = _socket.pipe(share());
    messages.subscribe((message) => console.log(message));
  }
};

export const updateTrip = (trip) => {
  connect();
  const message = {
    type: "update.trip",
    data: trip,
  };
  _socket.next(message);
};

// new
export const createTrip = (trip) => {
  connect();
  const message = {
    type: "create.trip",
    data: trip,
  };
  _socket.next(message);
};

export const getTrip = async (id) => {
  const url = `${config.baseApiUrl}/api/trip/${id}/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (response) {
    return { response, isError: true };
  }
};

export const getTrips = async () => {
  const url = `${config.baseApiUrl}/api/trip/`;
  const token = getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(url, { headers });
    return { response, isError: false };
  } catch (response) {
    return { response, isError: true };
  }
};
