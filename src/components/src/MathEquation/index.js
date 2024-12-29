import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import useStyles from './styles';

const MathEquation = ({ content, isBlock = false }) => {
  const classes = useStyles();

  const renderContent = () => {
    return isBlock ? (
      <BlockMath math={content} />
    ) : (
      content.split(/(\$[^$]+\$)/g).map((part, index) => {
        // Check if `part` is an inline KaTeX expression
        if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={index} math={part.slice(1, -1)} />; // Remove $ symbols
        }
        return <span key={index}>{part}</span>; // Render as regular text
      })
    );
  };

  return (
    <div className={classes.root}>
      {renderContent()}
    </div>
  );
};

export default MathEquation;
