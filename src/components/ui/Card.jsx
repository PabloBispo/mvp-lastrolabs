/** Container branco arredondado das seções. */
export default function Card({ as: Tag = 'section', className = '', children, ...props }) {
  return (
    <Tag className={`rounded-2xl bg-white ${className}`} {...props}>
      {children}
    </Tag>
  );
}
