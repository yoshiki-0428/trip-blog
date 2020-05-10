import React from "react"

// Components
import { graphql } from "gatsby"
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import PostSection from '../components/PostSection'
import { Tags } from '../components/Tags'

// Export Template for use in CMS preview
export const TagsListTemplate = ({
  title,
  subtitle,
  featuredImage,
  group,
  posts,
  selectedTag
}) => (
  <main className="TagsList">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <Tags tags={group} selectedTag={selectedTag} />

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
      selectedTag={tag}
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

        group: allMarkdownRemark(
            filter: {fields: { contentType: { eq: "posts" } }, frontmatter: { status: {eq: "Published"} } },
            limit: 2000) {
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
