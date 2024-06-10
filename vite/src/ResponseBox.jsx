import PropTypes from "prop-types";
import Markdown from "react-markdown";

// import './ResponseBox.css';

function ResponseBox({ text, onPhraseClick }) {
  function onClickPhrase(e, url) {
    e.preventDefault();
    console.log("url", url);
    console.log("e.text", e.target.textContent);
    onPhraseClick(e.target.textContent);
  }
  const matches = [...text.matchAll(new RegExp(/\[(\s*[\w\s\-\\'\\*]+)\s*\]/gi))];
  
  if (matches.length > 0) {
    for(let i = 0; i < matches.length; i++) {
      text = text.replace(matches[i][0], `[${matches[i][1]}](${matches[i][1]})`);
    }
  }
  
  return <Markdown components={{
    a: ({node, ...props}) => <a {...props} href="#" onClick={(e) => onClickPhrase(e, props.href)}>{props.children}</a>
  
  }}>{text}</Markdown>;
}

ResponseBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponseBox;
