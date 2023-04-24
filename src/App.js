import SearchBar from "./components/SearchBar";
import classes from "./App.module.css";
import Advertisement from "./components/Advertisement/advertisement";
import "./App.module.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import throttle from "lodash.throttle";

const App = () => {
  const [ads, setAds] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback((searchText) => {
    setError(null);
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/search`, {
        params: { keyword: searchText },
      })
      .then((res) => {
        setAds(res.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDataThrottle = useCallback(
    throttle(fetchData, 500, { leading: false, trailing: true }),
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.root}>
      <SearchBar fetchData={(searchText) => fetchDataThrottle(searchText)} />
      {(() => {
        if (loading) {
          return (
            <div className={classes.center}>
              <CircularProgress />
            </div>
          );
        }
        if (error) {
          return (
            <div className={classes.center}>
              <p className={classes.error}>{error}</p>
            </div>
          );
        }
        if (ads.length === 0) {
          return (
            <div className={classes.center}>
              <p>No data found!</p>
            </div>
          );
        }
        return (
          <div className={classes.grid}>
            {ads.map((ad) => (
              <Advertisement key={ad.id} data={ad} />
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default App;
