export const Posts = ({data}) => {
    return data.map(post => <div key={post.id} className="card" style={{width: "20rem"}}>
    <img className="card-img-top" src={post.img_url} alt="Card image cap" />
    <div className="card-body">
      <h5 className="card-title">{post.title}</h5>
      <p className="card-text">{post.body}</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>)

}