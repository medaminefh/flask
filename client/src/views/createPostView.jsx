export const CreatePostView = ({
  postDetails,
  setBody,
  setImage,
  setTitle,
  b,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      postDetails();
    }}
  >
    <div className="form-row">
      <div className="name">Title</div>
      <div className="value">
        <input
          className="input--style-6"
          type="text"
          name="Title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="name">Body</div>
      <div className="value">
        <div className="input-group">
          <input
            className="input--style-6"
            type="text"
            name="body"
            placeholder="body"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="name">Image</div>
      <div className="value">
        <div className="input-group js-input-file">
          <input
            className="input-file"
            type="file"
            name="img_url"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label className="label--file" htmlFor="file">
            Choose an Image
          </label>
          <span className="input-file__info">No Image chosen</span>
        </div>
        <div className="label--desc">Upload your Image. Max Image size 2MB</div>
      </div>
    </div>
    <button
      ref={b}
      style={{ display: "flex", margin: "0 auto" }}
      className="blue darken-1 btn waves-effect waves-light"
    >
      Save
    </button>
  </form>
);
