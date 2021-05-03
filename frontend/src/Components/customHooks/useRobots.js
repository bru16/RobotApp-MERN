import { useState, useEffect } from "react";
import axios from "axios";

//if theres not an id then get and return all the robots, else get the requested robot
const useRobots = ({ token, id = "" }) => {
  const [robots, setRobots] = useState(null);
  let isMounted = true;
  const API = "http://localhost:4000/api";
  useEffect(() => {
    fetchRobots();
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchRobots = async () => {
    try {
      const { data } = await axios.get(`${API}/products/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (isMounted) setRobots(data);
    } catch (error) {
      console.log(error);
    }
  };
  return robots;
};

export default useRobots;
