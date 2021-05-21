import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CreatePostView } from "../views/createPostView";

function CreatePost() {
  const history = useHistory();
  const preset = process.env.REACT_APP_PRESET;
  const cloudName = process.env.REACT_APP_CLOUDNAME;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [btnStatus, setBtnStatus] = useState("Submit");
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          img_url: url,
          title,
          body,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("error :", data.error);
            return;
          } else {
            console.log("created :", data);
            history.push("/");
            return;
          }
        })
        .catch((err) => {
          console.log(`error : ${err}`);
          return;
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", preset);
    data.append("cloud_name", cloudName);

    if (title && image && body) {
      setBtnStatus("Uploading...");
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            setBtnStatus("Submit");
            console.log("error :", data.error);
            return;
          }
          console.log(data);
          setUrl(data.url);
        })
        .catch((err) => {
          alert(data.error);
          setBtnStatus("Submit");
          console.log("err with uploading img :", err);
        });
    } else {
      setBtnStatus("Submit");
      console.log("fill all the fields");
      return;
    }
  };

  return (
    <CreatePostView
      btnStatus={btnStatus}
      setBody={setBody}
      setImage={setImage}
      setTitle={setTitle}
      postDetails={postDetails}
    />
  );
}

export default CreatePost;
