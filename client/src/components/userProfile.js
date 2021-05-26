import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserProfileView } from "../views/userProfileView";
export const UserProfile = () => {
  const [user, setUser] = useState("");
  const [photos, setPhotos] = useState("");
  const { userid } = useParams();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    fetch(`http://127.0.0.1:5000/user/${userid}`, {
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

  return photos && <UserProfileView user={user} photos={photos} />;
};
