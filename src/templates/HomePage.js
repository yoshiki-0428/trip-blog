import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import PostSection from '../components/PostSection'
import Adsense from '../components/Adsense'

// Export Template for use in CMS preview
export const HomePageTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = []
}) => (
  <main className="Home">
    <PageHeader
      large
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    {!!posts.length && (
      <section className="section">
        <div className="container">
          <PostSection posts={posts} />
        </div>
      </section>
    )}
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate
      {...page}
      {...page.frontmatter}
      body={page.html}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
    }))}

    />
    <Adsense/>
  </Layout>
)

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
    
    posts: allMarkdownRemark(
      filter: {fields: { contentType: { eq: "posts" } }, frontmatter: {status: {eq: "Published"}}},
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          excerpt(truncate: true, pruneLength: 50)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY/MM/DD")
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
  }
`
