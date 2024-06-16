import PropTypes from "prop-types";
import Markdown from "react-markdown";

function ResponseBox({ text, onPhraseClick }) {
  function onClickPhrase(e, url) {
    e.preventDefault();
    console.log("url", url);
    console.log("e.text", e.target.textContent);
    onPhraseClick(e.target.textContent);
  }
  const matches = [
    ...text.matchAll(new RegExp(/\[(\s*[\w\s\-\\'\\*]+)\s*\]/gi)),
  ];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const matchItem = matches[i];
      const [matchedContent, phrase] = matchItem;
      text = text.replace(matchedContent, `[${phrase}](#)`);
    }
  }

  return (
    <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-700 rounded-e-xl rounded-es-xl text-white">
      <Markdown
        components={{
          a: (props) => {
            return (
              <a
                {...props}
                role="button"
                onClick={(e) => onClickPhrase(e, props.children)}
              >
                {props.children}
              </a>
            );
          },
          strong: (props) => {
            return (
              <a
                className="text-primary font-bold"
                role="button"
                onClick={(e) => onClickPhrase(e, props.children)}
              >
                {props.children}
              </a>
            );
          },
          b: (props) => {
            return (
              <a
                className="text-primary font-bold"
                role="button"
                onClick={(e) => onClickPhrase(e, props.children)}
              >
                {props.children}
              </a>
            );
          },
        }}
      >
        {text}
      </Markdown>
    </div>
  );
}

ResponseBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponseBox;
