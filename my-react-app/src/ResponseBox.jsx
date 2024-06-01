import PropTypes from 'prop-types';
// import './ResponseBox.css';

function ResponseBox({ text }) {
  return (
    <div className="response-box">
      {text}
    </div>
  );
}

ResponseBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ResponseBox;
