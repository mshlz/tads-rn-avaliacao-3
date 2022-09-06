import Axios, { AxiosInstance } from "axios";

class GateService {
  private http: AxiosInstance;

  constructor() {
    this.http = Axios.create({
      baseURL: "https://lora-send-mshlz.vercel.app/api/gate/",
      headers: {
        Authorization: "token_01GC8776KMZMZHEGQBEXMXJESZ",
      },
    });
  }

  public async getCurrent() {
    const result = (await this.http.get("get-status")).data;
    return result.success ? result.data[0] : null;
  }

  public async getList() {
    const result = (await this.http.get("get-entries")).data;

    return {
      data: result.data,
      size: result.size,
    };
  }

  public async register(type: "OPEN" | "CLOSE") {
    const result = (
      await this.http.get("register", {
        params: { type },
      })
    ).data;

    return result.message;
  }

  public async remove(id: string | boolean) {
    const result = (
      await this.http.get("remove", {
        params: id === true ? { prune: "1" } : { id },
      })
    ).data;

    return result.message;
  }

  public async sub(id: string | boolean, email: string) {
    const result = (
      await this.http.get("sub", {
        params: { id, email },
      })
    ).data;

    return result.message;
  }
}

export default new GateService();
