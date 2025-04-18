const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center cursor-pointer bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors">
      {children}
    </button>
  );
};

export default Button;