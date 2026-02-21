export default function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      className="vc-input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}