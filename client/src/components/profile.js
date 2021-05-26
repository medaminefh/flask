import { useState, useEffect } from "react";
import { ProfileView } from "../views/profileView";
export const Profile = () => {
  const [user, setUser] = useState("");
  const [photos, setPhotos] = useState("");
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    fetch("http://127.0.0.1:5000/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPhotos(data.photos);
      })
      .catch((err) => console.log(err));
  }, []);

  return photos && <ProfileView user={user} photos={photos} />;
};
