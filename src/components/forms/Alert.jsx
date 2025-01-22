export default function Alert({ children }) {
  return (
    <div className="w-full text-2xl text-red-400 font-semibold pl-2 mt-[-1rem] mb-6">
      {children}
    </div>
  )
}
