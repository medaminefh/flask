import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

function CreatePost() {
  const history = useHistory();
  const b = useRef();
  const preset = process.env.REACT_APP_PRESET;
  const cloudName = process.env.REACT_APP_CLOUDNAME;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

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
      b.current.disabled = "true";
      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("error :", data.error);
            b.current.removeAttribute("disabled");
            return;
          }
          console.log(data);
          setUrl(data.url);
        })
        .catch((err) => {
          b.current.removeAttribute("disabled");
          console.log("err with uploading img :", err);
        });
    } else {
      console.log("fill all the fields");
      return;
    }
  };

  return (
    <div
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
      className="card input-field"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postDetails();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn blue darken-1" style={{ display: "flex" }}>
            <i style={{ marginRight: "5px" }} className="material-icons">
              cloud_upload
            </i>
            <span>File</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          ref={b}
          style={{ display: "flex", margin: "0 auto" }}
          className=" blue darken-1 btn waves-effect waves-light"
        >
          <i style={{ marginRight: "5px" }} className="material-icons">
            save
          </i>
          Save
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
