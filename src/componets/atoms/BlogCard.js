import React from 'react'
import moment from 'moment'

const AUTHORS = {
    1 : 'John Smith',
    2 : 'Jane Doe',
    3: 'Peter Parket',
}

const BlogCard = ({blog}) => {
  return (
    <article itemScope itemType="http://schema.org/BlogPosting" className="post">

                <header>

                    <h2 itemProp="headline">
                        {blog.title.rendered}
                    </h2>

                    {/* publication date */}
                    <div className="date">
                        <strong>Publish Date</strong>:
                        <span itemProp="datePublished">
                            <time dateTime={moment(blog.date).format("YYYY-MM-DD")}>
                                {moment(blog.date).format("LL")}
                            </time>
                        </span>
                    </div>

                    <div className="author">
                        <strong>Author</strong>:
                        <span itemProp="author">{AUTHORS[`${blog.author}`]}</span>
                    </div>

                </header>

                <div itemProp="articleBody" className="content" dangerouslySetInnerHTML={{__html: blog.content.rendered}}>
                </div>

    </article>
  )
}

export default BlogCard