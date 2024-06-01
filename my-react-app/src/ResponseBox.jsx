import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
// import './ResponseBox.css';

function ResponseBox({ text, onPhraseClick }) {
  const MyLink = ({ children, href }) => (
    <a href={href} onClick={(e) => onClickPhrase(e, href)}>
      {children}
    </a>
  );
  function onClickPhrase(e, url) {
    e.preventDefault();
    console.log(url);
    onPhraseClick(url);
  }
  return (
    <ReactMarkdown
      components={{
        a: MyLink,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

ResponseBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponseBox;
