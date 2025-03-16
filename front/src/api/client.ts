import { HttpClient, PrinterApi } from "@/gen/PrinterApi";
import { useToken } from "@/state/token";

export function useApi() {
  const { token } = useToken();
  const client = new HttpClient({
    baseUrl: import.meta.env.PUBLIC_API_URL,
    baseApiParams: {
      headers: {
        Authorization: token.value ? `Bearer ${token.value}` : "",
      },
    },
  });

  return new PrinterApi(client);
}
