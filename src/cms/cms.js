import React from 'react'
import CMS from 'netlify-cms-app'
import './cms-utils'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import moment from 'moment'

import { HomePageTemplate } from '../templates/HomePage'
import { ComponentsPageTemplate } from '../templates/ComponentsPage'
import { ContactPageTemplate } from '../templates/ContactPage'
import { BlogIndexTemplate } from '../templates/BlogIndex'
import { SinglePostTemplate } from '../templates/SinglePost'

CMS.registerMediaLibrary(uploadcare)

if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  CMS.registerPreviewStyle(
    window.localStorage.getItem('netlifySiteURL') + '/styles.css'
  )
} else {
  CMS.registerPreviewStyle('/styles.css')
}

CMS.registerPreviewTemplate('home-page', ({ entry }) => (
  <HomePageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('components-page', ({ entry }) => (
  <ComponentsPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('contact-page', ({ entry }) => (
  <ContactPageTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('blog-page', ({ entry }) => (
  <BlogIndexTemplate {...entry.toJS().data} />
))
CMS.registerPreviewTemplate('posts', ({ entry }) => {
  const isDateObject = Boolean(typeof entry.toJS().data.date === 'object')
  const date = isDateObject ? moment(entry.toJS().data.date).format("YYYY/MM/DD HH:mm") : entry.toJS().data.date
  return (
    <SinglePostTemplate
      title={entry.toJS().data.title}
      date={date}
      body={entry.toJS().data.body}
      nextPostURL={entry.toJS().data.nextPostURL}
      prevPostURL={entry.toJS().data.prevPostURL}
    />
  )
})
