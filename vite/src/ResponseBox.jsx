import PropTypes from "prop-types";
// import './ResponseBox.css';

function ResponseBox({ text, onPhraseClick }) {
  // replace \n with br text
  text = text.replace(/\\n/g, "");
  function replaceBracketWithA(input) {
    let output = [];
    let tmp = "";
    let inSideA = false;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "[") {
        output.push(tmp);
        tmp = "";
        inSideA = true;
      } else if (input[i] === "]") {
        inSideA = false;
        output.push(<a onClick={(e) => onClickPhrase(e, tmp)}>{tmp}</a>);
        tmp = "";
      } else {
        tmp += input[i];
      }
    }
    return output;
  }
  function onClickPhrase(e, url) {
    e.preventDefault();
    console.log("url", url);
    console.log("e.text", e.target.textContent);
    onPhraseClick(e.target.textContent);
  }
  return replaceBracketWithA(text);
}

ResponseBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponseBox;
