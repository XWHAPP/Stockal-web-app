import axios, { AxiosError, AxiosResponse } from 'axios';
import { SentimentResults } from '../Models/SentimentResults';

export const getSentimentalResults = async (stock: String): Promise<SentimentResults> => {
  // TODO: FUNCTIONIZE INTO GENERAL API / MIDDLEWARE
  const searchResult = await axios
    .get(`/Sentiment`, {
      params: {
        stock: stock,
      },
    })
    .then((response: AxiosResponse) => {
      console.log(response);
      // Transform data
      const sentimentResults: SentimentResults = {
        negativity: response.data.Negative_score,
        neutrality: response.data.Neutral_score,
        positivity: response.data.Positive_score,
      };
      ////
      return sentimentResults;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return Promise.reject(error);
    });

  return Promise.resolve(searchResult);
};
