import axios from "axios";

class AxiosManager {
  async axios(url, method, body) {
    const data = await axios({
      method,
      url: ` http://localhost:3001${url}`,
      data: body && body,
    });
    return data.data;
  }
}

const axiosManager = new AxiosManager();

export default axiosManager;