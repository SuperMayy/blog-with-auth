import React, {useState, useEffect} from 'react'
import useAuth from '../../hooks/useAuth'
import BlogCard from '../atoms/BlogCard';

const URL = 'https://js1.10up.com/wp-json/wp/v2/posts'

const Home = () => {
  const [errMsg, setErrMsg] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [blogs, setBlogs] = useState([])
  const { auth, tokenIsValid } = useAuth()

  const fetchBlogs = () => {
    fetch(URL)
    .then(res => {
      if(!res.ok){
        throw Error('There is a server error');
      }
      return res.json();
     })
     .then(data => {
      setIsPending(false);
      setBlogs(data)
      })
      .catch(err => {
        console.error(err)
        setErrMsg(err.message)
      }); 
  }

  useEffect(() => {
    fetchBlogs()

    return () => {
      setIsPending(true)
      setErrMsg(null)
    }

  }, [])


  return (
    <>{isPending ? errMsg ? <div>{errMsg}</div> : <div>Fetching Data</div> 
     :
    <div>
        {/*Should only show when user is logged in */}
        <div>{tokenIsValid && <section className="welcome logged-in">
            Welcome {auth.username}!
        </section>}</div>

        {/* Retrieve blog posts from WP API. */}
        <div itemScope itemType="https://schema.org/Blog">
            {blogs.map(blog => <BlogCard blog={blog} key={blog.id}/>)}
        </div>
      </div>}
    </>
  )
}

export default Home