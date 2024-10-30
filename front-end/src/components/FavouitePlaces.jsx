import { useEffect, useState } from "react";
export function GetFavouritePlaces() {
  const [favouritePlaces, setFavouritePlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:3333/trips/places/1");
      const jsonResult = await result.json();
      setFavouritePlaces(jsonResult);
    };
    fetchData();
  }, []);

  return favouritePlaces;
}
