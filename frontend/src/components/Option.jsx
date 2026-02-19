function Option({ text, selected, onClick }) {
    return (
      <div
        onClick={onClick}
        className={`p-3 border rounded cursor-pointer ${
          selected ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        {text}
      </div>
    );
  }
  
  export default Option;
  