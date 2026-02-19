import Option from "./Option";

function QuestionCard({ question, selected, setSelected }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Question */}
      <h2 className="text-lg font-semibold text-gray-800 leading-relaxed">
        {question.question}
      </h2>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-2" />

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <Option
            key={i}
            text={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>

    </div>
  );
}

export default QuestionCard;
