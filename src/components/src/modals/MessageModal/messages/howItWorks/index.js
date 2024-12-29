import { appName } from '@/app/config';
import words from './words'; // Import words for translations
import { useLanguageContext } from '@/contexts/LanguageContext'; // Import currentLanguage from context
import SocialMediaBlock from '@/components/utilities/SocialMediaBlock';

const message = () => {
  const { currentLanguage } = useLanguageContext(); // Get current language from context

  return [
    { type: `title`, content: `${words.HowItWorks[currentLanguage]} ${appName}` },
    {
      type: `paragraph`,
      content: `${appName} ${words.IntroParagraph[currentLanguage]}`
    },
    { type: `header`, content: `${words.Step1[currentLanguage]}` },
    {
      type: `paragraph`,
      content: `${words.Step1Paragraph[currentLanguage]} ${appName}.`
    },
    { type: `header`, content: `${words.Step2[currentLanguage]}` },
    {
      type: `paragraph`,
      content: `${words.Step2Paragraph[currentLanguage]} ${appName}.`
    },
    { type: `header`, content: `${words.Step3[currentLanguage]}` },
    {
      type: `paragraph`,
      content: `${words.Step3Paragraph[currentLanguage]} ${appName}.`
    },
    {
      type: `component`,
      content: <SocialMediaBlock />,
    },
  ];
};

export default message;
