import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
// import './ResponseBox.css';

function ResponseBox({ text, onPhraseClick }) {
  text =
    "Sure, here's some information about lentil soup with marked interesting or complex phrases:Lentil soup is a [hearty](hearty) and [nutritious](nutritious) dish made from [lentils](lentils), a type of [legume](legume) known for their [high protein](high protein) and [fiber content](fiber content). [Lentils](    lentils) come in various [colors](colors) such as [brown](brown), [green](green), and [red](red), each o    ffering a slightly different [texture](texture) and [flavor profile](flavor profile).To make lentil soup, [lentils](lentils) are [cooked](cooked) with [aromatic](aromatic) [vegetables](vegetables) such as [onions](onions), [carrots](carrots), and [celery](celery) in a [flavorful](flavorful) [broth](broth) or [stock](stock). [Herbs](herbs) and [spices](spices) like [cumin](cumin), [coriander](coriander), and [bay leaves](bay leaves) are often added to enhance the [taste](taste) and [aroma](aroma) of the soup";

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
