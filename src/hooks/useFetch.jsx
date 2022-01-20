import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(start, end) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    console.log(start, end);
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API}&start_date=${start}&end_date=${end}&thumbs=true`
      );
      await setList((prev) => [...prev, ...res.data].reverse());
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [start, end]);

  useEffect(() => {
    sendQuery(start);
  }, [start, sendQuery, end]);

  return { loading, error, list };
}

export default useFetch;
