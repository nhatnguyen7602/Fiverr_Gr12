import axios from "axios";
import { BASE_URL, https, TOKEN_CYBERSOFT } from "./configURL";

export const userServ = {
  layDsNguoiDung: () => {
    let uri = `/api/users`;

    return https.get(uri);
  },

  layNguoiDungTheoId: (id) => {
    let uri = `/api/users/${id}`;

    return https.get(uri);
  },

  themNguoiDung: (data) =>
    axios({
      url: `${BASE_URL}/api/users`,
      method: "POST",
      data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  capNhatNguoiDung: (data) =>
    axios({
      url: `${BASE_URL}/api/users/${data.id}`,
      method: "PUT",
      data,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    }),

  xoaNguoiDung: (id) => {
    let uri = `/api/users?id=${id}`;

    return https.delete(uri);
  },
};
