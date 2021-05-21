import React, { useState, useEffect } from "react";
import { Posts } from "../views/posts.jsx";
const Home = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const photos = localStorage.getItem("data");
    if (photos) {
      setData(photos);
      return;
    } else if (jwt) {
      fetch("http://127.0.0.1:5000/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }
  }, []);

  const comment = (e, text, postId) => {
    e.preventDefault();
    fetch("/posts/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        const newData = data.map((i) => {
          if (i._id === d._id) return d;
          return i;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const likePost = (id) => {
    fetch("/posts/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        const newData = data.map((i) => {
          if (i._id === d._id) return d;
          return i;
        });
        if (data.includes(d._id)) return;
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unLikePost = (id) => {
    fetch("/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        const newData = data.map((i) => {
          if (i._id === d._id) return d;
          return i;
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    fetch(`/posts/delete/${id}`, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((d) => {
        const newData = data.filter((i) => i._id !== d._id);
        setData(newData);
      });
  };

  return data ? (
    <div
      className="container d-flex mt-5 mb-5"
      style={{
        flexWrap: "wrap",
      }}
    >
      {<Posts photos={data.photos} />}
    </div>
  ) : (
    <h1 className="text-center">There is No Photos</h1>
  );
};

export default Home;
