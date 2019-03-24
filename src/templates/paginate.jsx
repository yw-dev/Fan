import React from 'react'
import Link from 'gatsby-link'

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const Paginate = ({ pageContext }) => {
  const { group, index, first, last, pageCount, pathPrefix } = pageContext
  const previousUrl = index - 1 == 1 ? pathPrefix : pathPrefix + "/" + (index - 1).toString()
  const nextUrl = pathPrefix + "/" + (index + 1).toString()

  return (
    <div>
      <h4>{pageCount} Pages</h4>

      {group.map(({ node }) => (
        <div key={node.id} className="blogListing">
          <div className="date">{node.frontmatter.date}</div>
          <Link className="blogUrl" to={node.fields.slug}>
            {node.frontmatter.title}
          </Link>
          <div>{node.excerpt}</div>
        </div>
      ))}
      <div className="previousLink">
        <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
      </div>
      <div className="nextLink">
        <NavLink test={last} url={nextUrl} text="Go to Next Page" />
      </div>
    </div>
  )
}
export default Paginate