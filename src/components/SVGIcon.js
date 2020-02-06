import React from 'react'

import './SVGIcon.css'

export default ({ src, size, onClick = null }) => {
  const icon = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`
  }
  return (
    <div className="SVGIcon" onClick={onClick} style={{height: size + 'rem', width: size + 'rem'}}>
      <div className="SVGIcon--icon" style={icon} />
    </div>
  )
}
