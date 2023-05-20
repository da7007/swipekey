import axios from "axios";

interface SwipeKeySecret {
  application: string;
  secret_name: string;
}

export async function getSecret(args: SwipeKeySecret) {
  return (await axios.post("http://localhost:3000/fetch", null, { params: args })).data.fetchedSecret.secret_value;
}
