import React from "react"
import "./TagsList.css"

// Components
import { Link, graphql } from "gatsby"
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import { kebabCase } from 'lodash/string'
import { orderBy } from 'lodash/collection'
import PostSection from '../components/PostSection'

// Export Template for use in CMS preview
export const TagsListTemplate = ({
  title,
  subtitle,
  featuredImage,
  group,
  posts,
  targetTag
}) => (
  <main className="TagsList">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <ul>
      {orderBy(group, ['totalCount'], ['desc']).map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={targetTag === tag.fieldValue ? 'TagsList--Selected' : '' }>
            {tag.fieldValue}
            <span>{tag.totalCount}</span>
          </Link>
        </li>
      ))}
    </ul>

    {!!posts.length && (
      <section className="section">
        <div className="container">
          <PostSection posts={posts} />
        </div>
      </section>
    )}
  </main>
)

const TagsList = ({ pageContext: { tag }, data: { page, group, posts } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TagsListTemplate
      {...page.frontmatter}
      group={group.group}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      targetTag={tag}
    />
  </Layout>
)
export default TagsList

export const pageQuery = graphql`
    query TagsList($id: String!, $tag: String) {
        page: markdownRemark(id: { eq: $id }) {
            ...Meta
            html
            frontmatter {
                title
                subtitle
                featuredImage
            }
        }

        group: allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }

        posts: allMarkdownRemark(
            filter: {fields: { contentType: { eq: "posts" } }, frontmatter: { status: {eq: "Published"}, tags: {eq: $tag } } },
            sort: {order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    excerpt(truncate: true, pruneLength: 50)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
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
