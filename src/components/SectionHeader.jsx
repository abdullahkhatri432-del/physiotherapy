export function SectionHeader({ eyebrow, title, lead, align = 'left', className = '' }) {
  const classes = ['section-head', align === 'center' ? 'section-head--center' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {lead ? <p className="section-head__lead">{lead}</p> : null}
    </div>
  )
}

export default SectionHeader
