import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { Status } from "@/lib/types";
import { NEXT_PUBLIC_COIN_GECKO_API_KEY } from "@/lib/config";

const useTokenPriceUsd = (tokenId: string) => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      setStatus(Status.PENDING);
      setError(null);

      const response = await axios.get(
        `https://pro-api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`,
        {
          headers: {
            "x-cg-pro-api-key": NEXT_PUBLIC_COIN_GECKO_API_KEY,
          }
        }
      );

      setPrice(response.data[tokenId].usd);
      setStatus(Status.SUCCESS);
      return response.data[tokenId].usd;
    } catch (error) {
      setStatus(Status.ERROR);
      setError(error instanceof Error ? error.message : "Failed to fetch price");
      throw error;
    }
  }, [tokenId]);

  useEffect(() => {
    fetchPrice();
  }, [fetchPrice]);

  return { price, status, error, fetchPrice };
};

export default useTokenPriceUsd;
