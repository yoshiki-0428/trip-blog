import { Link } from 'gatsby'
import { orderBy } from 'lodash/collection'
import { kebabCase } from 'lodash/string'
import React from 'react'
import './Tags.css'

const sortTotalCount = (tags) => orderBy(tags, ['totalCount', 'fieldValue'], ['desc'])

export const Tags = ({ tags, selectedTag }) => {
  return <div className={"Tags"}>
    {sortTotalCount(tags).map(tag => (
      <li key={tag.fieldValue}>
        <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={selectedTag === tag.fieldValue ? 'Tags--Selected' : '' }>
          {tag.fieldValue}
          <span>{tag.totalCount}</span>
        </Link>
      </li>
    ))}
  </div>
}
