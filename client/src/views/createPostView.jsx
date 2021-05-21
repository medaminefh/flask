export const CreatePostView = ({
  btnStatus,
  postDetails,
  setBody,
  setImage,
  setTitle,
}) => (
  <div className="container mt-5 border p-3 rounded">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postDetails();
      }}
    >
      <div className="form-group">
        <label>Title</label>
        <input
          name="Title"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="form-control"
          required
          placeholder="Title..."
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          name="body"
          onChange={(e) => setBody(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Description..."
        />
      </div>
      <div className="form-group form-check">
        <input
          name="img_url"
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="form-file-input"
        />
      </div>
      <button
        disabled={btnStatus != "Submit" ? true : false}
        type="submit"
        className="btn btn-outline-primary btn-sm"
      >
        {btnStatus}
      </button>
    </form>
  </div>
);
