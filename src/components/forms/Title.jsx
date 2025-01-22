export default function Title({ 
  text,
  className
}) {
  return (
    <h1 className={`m-0 pb-10 text-dark-gray-600 dark:text-white text-6xl font-semibold text-center uppercase ${className}`}>{text}</h1>
  );
}