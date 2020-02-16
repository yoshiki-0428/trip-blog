import { orderBy } from 'lodash/collection'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash/string'
import React from 'react'
import './Tags.css'

const sortTotalCount = (tags) => orderBy(tags, ['totalCount'], ['desc'])
const splitTags = (tags, condition) => tags.filter(tag => condition(tag))

export const Tags = ({ tags, selectedTag }) => {
  const oneContainTags = splitTags(tags, (tag) => tag.totalCount === 1).slice(0, 10)
  const twoOverTags = splitTags(tags, (tag) => tag.totalCount > 1)
  const unionTags = sortTotalCount(twoOverTags.concat(oneContainTags))
  return <div className={"Tags"}>
    {unionTags.map(tag => (
      <li key={tag.fieldValue}>
        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={selectedTag === tag.fieldValue ? 'Tags--Selected' : '' }>
          {tag.fieldValue}
          <span>{tag.totalCount}</span>
        </Link>
      </li>
    ))}
  </div>
}
