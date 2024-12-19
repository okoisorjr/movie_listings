const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
    </div>
  )
}

export default Loader
