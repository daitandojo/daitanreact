import React from 'react';
import { useLanguageContext } from '@/contexts/LanguageContext'; 
import words from './words';

import {
  StyledModal,
  StyledModalContent,
  Title,
  Header,
  Subheader,
  Paragraph,
  Quote,
  BulletPoints,
  ComponentContainer,
  ProceedButton,
} from './styles';

const MessageModal = ({ onClose, content }) => {
  const { currentLanguage } = useLanguageContext();

  const handleProceed = () => {
    onClose();
  };

  return (
    <StyledModal
      open={true}
      onClose={handleProceed}
      aria-labelledby="message-modal-title"
      aria-describedby="message-modal-description"
    >
      <StyledModalContent>
        {content.map((item, idx) => {
          switch (item.type) {
            case "title":
              return (
                <Title key={idx} variant="h2" component="h2">
                  {item.content}
                </Title>
              );
            case "header":
              return (
                <Header key={idx} variant="h4" component="h2">
                  {item.content}
                </Header>
              );
            case "subheader":
              return (
                <Subheader key={idx} variant="h6" component="h3">
                  {item.content}
                </Subheader>
              );
            case "paragraph":
              return (
                <Paragraph key={idx} variant="body1">
                  {item.content}
                </Paragraph>
              );
            case "quote":
              return (
                <Quote key={idx} variant="body2">
                  "{item.content}"
                </Quote>
              );
            case "bulletPoints":
              return (
                <BulletPoints key={idx}>
                  {item.content.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </BulletPoints>
              );
            case "component":
              return (
                <ComponentContainer key={idx}>
                  {item.content}
                </ComponentContainer>
              );
            default:
              return null;
          }
        })}

        <ProceedButton variant="contained" onClick={handleProceed}>
          {words.Proceed[currentLanguage]}
        </ProceedButton>
      </StyledModalContent>
    </StyledModal>
  );
};

export default MessageModal;
