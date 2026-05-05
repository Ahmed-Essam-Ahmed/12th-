export default function EmptyState({ icon = 'bi-inbox', title, message }) {
  return (
    <div className="text-center py-5 text-muted">
      <i className={`bi ${icon} fs-1 d-block mb-2`} />
      {title   && <h6>{title}</h6>}
      {message && <p className="small">{message}</p>}
    </div>
  )
}