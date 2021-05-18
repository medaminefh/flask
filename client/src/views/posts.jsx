export const Posts = ({ data }) => {
  return data.map((post) => (
    <div
      key={post.id}
      className="card mt-2 ml-2"
      style={{ width: "18rem", maxWidth: "20rem" }}
    >
      <img
        className="card-img-top"
        style={{ maxHeight: "15rem" }}
        src={post.img_url}
        alt="Card image cap"
      />
      <div className="card-body d-flex flex-column justify-content-end">
        <h5 className="card-title text-center">{post.title}</h5>
        <p className="card-text text-center">{post.body}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  ));
};
