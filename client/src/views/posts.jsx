import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
export const Posts = ({ photos }) => {
  const id = JSON.parse(localStorage.getItem("user")).id;
  return photos.map((photo) => (
    <div
      key={uuid()}
      className="text-center card mt-5 ml-2 shadow-lg"
      style={{
        width: "18rem",
        maxWidth: "20rem",
        height: "25rem",
        overflow: "hidden",
      }}
    >
      <Link
        className="h4"
        to={photo.id == id ? "/profile" : `/user/${photo.id}`}
      >
        {photo.username}
      </Link>
      <div className="card-body">
        <h5 className="card-title">{photo.title}</h5>
        <p className="card-text">{photo.body}</p>
      </div>
      <img
        style={{ maxHeight: "13rem" }}
        src={photo.img_url}
        className="card-img-top"
        alt={photo.title}
      />
      <p className="card-text">
        <small className="text-muted float-right">
          Last updated 3 mins ago
        </small>
      </p>
    </div>
  ));
};
