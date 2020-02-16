const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            frontmatter {
              template
              title
              tags
            }
            fields {
              slug
              contentType
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()))
    return Promise.reject(result.errors)
  }

  const mdFiles = result.data.postsRemark.edges
  const contentTypes = _.groupBy(mdFiles, 'node.fields.contentType')
  const tags = result.data.tagsGroup.group

  let tagId;
  // TODO DRY
  _.each(contentTypes, (pages, contentType) => {
    const pagesToCreate = pages.filter(page =>
      // get pages with template field
      _.get(page, `node.frontmatter.template`)
    )
    if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)


    pagesToCreate.forEach((page, index) => {
      if (page.node.frontmatter.template === 'TagsList') tagId = page.node.id
    })
  })
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve("src/templates/TagsList.js"),
      context: {
        tag: tag.fieldValue,
        id: tagId,
      },
    })
  })

  _.each(contentTypes, (pages, contentType) => {
    const pagesToCreate = pages.filter(page =>
      // get pages with template field
      _.get(page, `node.frontmatter.template`)
    )
    if (!pagesToCreate.length) return console.log(`Skipping ${contentType}`)

    console.log(`Creating ${pagesToCreate.length} ${contentType}`)

    pagesToCreate.forEach((page, index) => {
      console.log('page', page)
      const id = page.node.id
      createPage({
        // page slug set in md frontmatter
        path: page.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(page.node.frontmatter.template)}.js`
        ),
        // additional data can be passed via context
        context: {
          id
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // convert frontmatter images
  fmImagesToRelative(node)

  // Create smart slugs
  // https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-node.js
  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (_.get(node, 'frontmatter.slug')) {
      slug = `/${node.frontmatter.slug.toLowerCase()}/`
    } else if (
      // home page gets root slug
      parsedFilePath.name === 'home' &&
      parsedFilePath.dir === 'pages'
    ) {
      slug = `/`
    } else if (_.get(node, 'frontmatter.title')) {
      slug = `/${_.kebabCase(parsedFilePath.dir)}/${_.kebabCase(
        node.frontmatter.title
      )}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })

    // Add contentType to node.fields
    createNodeField({
      node,
      name: 'contentType',
      value: parsedFilePath.dir
    })
  }
}

// Random fix for https://github.com/gatsbyjs/gatsby/issues/5700
module.exports.resolvableExtensions = () => ['.json']
