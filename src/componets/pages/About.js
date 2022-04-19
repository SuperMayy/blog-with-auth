import React, {useState, useEffect} from 'react'


const URL = 'https://js1.10up.com/wp-json/wp/v2/pages/91'

const About = () => {
 const [errMsg, setErrMsg] = useState(null)
 const [isPending, setIsPending] = useState(true)
 const [pageData, setPageData] = useState({})

  const fetchAboutPage = () => {
    fetch(URL)
    .then(res => {
      if(!res.ok){
        throw Error('There is a server error');
      }
      return res.json();
     })
     .then(data => {
      setIsPending(false);
      setPageData(data)
      })
      .catch(err => {
        console.error(err)
        setErrMsg(err.message)
      }); 
  }
  
  useEffect(() => {

    fetchAboutPage()

    return () => {
      setIsPending(true)
      setErrMsg(null)
    }

  }, [])

  return (
    <>
    {isPending ? errMsg ? <div>{errMsg}</div> : <div>Fetching Data</div> : 
      <div>
        <h1>{pageData.title.rendered}</h1>
       <div className="content" dangerouslySetInnerHTML={{__html: pageData.content.rendered}}></div>
      </div>
    }
    </>
  )
}

export default About