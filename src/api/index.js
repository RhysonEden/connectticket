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
    const { data } = await axios.post("api/tickets/create", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
    });
    console.log(data);
  } catch (error) {
    throw error;
  }
}

export async function deleteTix(id) {
  console.log("id", id);

  try {
    const { data } = await axios.post("api/tickets/delete", { id });
    console.log(data);
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
  console.log("data", callname, callnumber, gvrid, notes, ntcflag, date, id);
  try {
    const { data } = await axios.post("api/tickets/update", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      id,
    });
    console.log(data);
  } catch (error) {
    throw error;
  }
}

export async function getPart(gvr) {
  console.log("Api Index", gvr);
  try {
    const part = await axios.get(`/api/tickets/search/${gvr}`);
    console.log("part", part);
    return part;
  } catch (error) {
    throw error;
  }
}
