export default function CheckBox({ 
  name, 
  text, 
  isDark 
}) {
  const dark = isDark ? 'dark' : '';

  return (
    <label className={`${dark} grid grid-cols-[auto_1fr] items-center gap-3 px-2`}>
      <input 
        type='checkbox'
        className="
        appearance-none 
        size-5 rounded-md border-2 border-light-gray-600 
        bg-white dark:bg-dark-gray-600 
        accent-dark-gray-600 
        checked:appearance-auto" 
        name={name} 
      />
      <span className="select-none font-medium text-xl text-dark-gray-600 dark:text-light-gray-600 cursor-pointer">{ text }</span>
    </label>
  );
}