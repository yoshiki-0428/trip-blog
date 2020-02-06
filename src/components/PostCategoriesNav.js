import React from 'react'
import { Link } from 'gatsby'

import './PostCategoriesNav.css'
import PopupSearchBtn from './PopupSearchBtn'

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <PopupSearchBtn />}
  </div>
)

export default PostCategoriesNav
