import api from "@/utils/api-service";
import { network } from "@/utils/constants";

export async function fetchTvl() {
  try {
    const respose = await api.get(`/strategies/tvl?env=${network}`);

    return respose.data;
  } catch {
    throw new Error("Failed to fetch data");
  }
}
