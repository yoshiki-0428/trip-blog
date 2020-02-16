import React from "react"
import "./TagsList.css"

// Components
import { Link, graphql } from "gatsby"
import PageHeader from '../components/PageHeader'
import Layout from '../components/Layout'
import { kebabCase } from 'lodash/string'
import { orderBy } from 'lodash/collection'

// Export Template for use in CMS preview
export const TagsListTemplate = ({
  title,
  subtitle,
  featuredImage,
  group
}) => (
  <main className="TagsList">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <ul>
      {orderBy(group, ['totalCount'], ['desc']).map(tag => (
        <li>
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue}
            <span>{tag.totalCount}</span>
          </Link>
        </li>
      ))}
    </ul>
  </main>
)

const TagsList = ({ data: { page, group } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <TagsListTemplate {...page.frontmatter} group={group.group} />
  </Layout>
)
export default TagsList

export const pageQuery = graphql`
    query TagsList($id: String!) {
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
    }
`
