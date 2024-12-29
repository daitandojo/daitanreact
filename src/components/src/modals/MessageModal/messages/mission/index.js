import { appName } from '@/app/config';
import words from './words'; 
import { useLanguageContext } from '@/contexts/LanguageContext';
import SocialMediaBlock from '@/components/utilities/SocialMediaBlock';

const message = () => {
  const { currentLanguage } = useLanguageContext();

  return [
    { type: `title`, content: `${words.OurMission[currentLanguage]}` },
    { type: `header`, content: `${words.EmpoweringEducators[currentLanguage]}` },
    {
      type: `paragraph`,
      content: words.EmpoweringEducatorsParagraph[currentLanguage].replace('{appName}', appName),
    },
    { type: `header`, content: `${words.PersonalizedLearning[currentLanguage]}` },
    {
      type: `paragraph`,
      content: words.PersonalizedLearningParagraph[currentLanguage].replace('{appName}', appName),
    },
    { type: `header`, content: `${words.DrivingInnovation[currentLanguage]}` },
    {
      type: `paragraph`,
      content: words.DrivingInnovationParagraph[currentLanguage].replace('{appName}', appName),
    },
    {
      type: `component`,
      content: <SocialMediaBlock />,
    },
  ];
};

export default message;
