import axios from "axios";

export default async function getSomething() {
  try {
    const { data } = await axios.get("/api/tickets");
    sessionStorage.setItem("data", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateRefresh() {
  try {
    console.log("Something Else");
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
  date,
  user,
  email,
  gpid,
  gpcust
) {
  try {
    await axios.post("api/tickets/create", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      date,
      user,
      email,
      gpid,
      gpcust,
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

export async function openTix(id) {
  try {
    await axios.post("api/tickets/open", { id });
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
  // date,
  id,
  user,
  email,
  gpid,
  gpcust
) {
  try {
    await axios.post("api/tickets/update", {
      callname,
      callnumber,
      gvrid,
      notes,
      ntcflag,
      // date,
      id,
      user,
      email,
      gpid,
      gpcust,
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

export async function loginUser(username, password) {
  try {
    const { data } = await axios.post("/api/users/login", {
      username,
      password,
    });
    sessionStorage.setItem("change", data.user.change);
    sessionStorage.setItem("admin", data.user.admin);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", data.user.username);
    sessionStorage.setItem(
      "email",
      "guardianresourcecenter@guardianfueltech.com"
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(username, password, email) {
  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      password,
      email,
    });
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", data.user.username);
    // sessionStorage.setItem("id", data.user.id);
    return data;
  } catch (error) {
    throw error;
  }
}
