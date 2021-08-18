import axios from "axios";
let token = sessionStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export default async function getSomething() {
  try {
    const { data } = await axios.get("/api/tickets");
    // sessionStorage.setItem("data", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateRefresh() {
  let head = config.headers.Authorization;
  if (!head) {
    let head = "Not Valid";
    return head;
  }
  try {
    console.log("Something Else");
    const { data } = await axios.get("/api/tickets", { head });
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
  let head = config.headers.Authorization;
  if (!head) {
    let head = "Not Valid";
    return head;
  }
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
      head,
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteTix(id) {
  console.log(typeof config.headers.Authorization);
  let head = config.headers.Authorization;
  if (!head) {
    let head = "Not Valid";
    return head;
  }
  try {
    await axios.post("api/tickets/delete", { id, head });
  } catch (error) {
    throw error;
  }
}

export async function openTix(id) {
  let head = config.headers.Authorization;
  if (!head) {
    let head = "Not Valid";
    return head;
  }
  try {
    await axios.post("api/tickets/open", { id, head });
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
    let head = config.headers.Authorization;
    if (!head) {
      let head = "Not Valid";
      return head;
    }
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
      head,
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
    throw error;
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
