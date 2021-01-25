import { AxiosError } from "axios";

export default (e: AxiosError | null) => {
  if (e !== null) {
    const res = (e as AxiosError).response;

    if (res !== undefined && res !== null) {
      const code = res["data"]["resultCode"];
      const msg = res["data"]["resultMsg"];

      console.log(msg);
      if (code !== undefined && code !== null) {
        return msg;
      }
    }
  }

  return "api.error.unknown";
};
