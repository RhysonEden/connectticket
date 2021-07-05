import axios from "axios";

export default async function getSomething() {
  try {
    const { data } = await axios.get("/api/tickets");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTicket(
  callname,
  callnumber,
  gvrid,
  notes,
  ntcflag,
  date
) {
  try {
    await axios.post("api/tickets/create", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTix(id) {
  try {
    await axios.post("api/tickets/delete", { id });
  } catch (error) {
    throw error;
  }
}

export async function updateTix(
  callname,
  callnumber,
  gvrid,
  notes,
  ntcflag,
  date,
  id
) {
  try {
    await axios.post("api/tickets/update", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      id,
    });
  } catch (error) {
    throw error;
  }
}

export async function getPart(gvr) {
  try {
    const part = await axios.get(`/api/tickets/search/${gvr}`);
    return part;
  } catch (error) {
    throw error;
  }
}
