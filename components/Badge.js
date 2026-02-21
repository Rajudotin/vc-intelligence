export default function Badge({ variant = "neutral", children }) {
  const variantClass = {
    success: "vc-badge-success",
    warning: "vc-badge-warning",
    info: "vc-badge-info",
    neutral: "vc-badge-neutral",
  }[variant];

  return <span className={`vc-badge ${variantClass}`}>{children}</span>;
}