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
