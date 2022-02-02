import React from 'react';

const AccordionItem = ({ ariaExpanded, item, index, onClick }) => (
  <div className="faq__question" key={item.question}>
    <dt>
      <button aria-expanded={ariaExpanded} aria-controls={`faq${index + 1}_desc`} data-qa="faq__question-button" onClick={onClick}>
        {item.question}
      </button>
    </dt>
    <dd>
      <p id={`faq${index + 1}_desc`} data-qa="faq__desc">
        {item.answer}
      </p>
    </dd>
  </div>
);

export default AccordionItem;
