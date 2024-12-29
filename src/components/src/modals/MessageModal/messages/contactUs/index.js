import { appName } from '@/app/config';
import words from './words'; // Import words for translations
import { useLanguageContext } from '@/contexts/LanguageContext'; // Import currentLanguage from context
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Typography, IconButton } from '@mui/material';
import SocialMediaBlock from '@/components/utilities/SocialMediaBlock';

const message = () => {
  const { currentLanguage } = useLanguageContext(); // Get current language from context

  return [
    { type: "title", content: words.ContactUs[currentLanguage] },
    { type: "header", content: words.HelpHeader[currentLanguage] },
    {
      type: "paragraph",
      content: `${words.AssistanceParagraph[currentLanguage]} ${appName}.`
    },
    { type: "header", content: words.GetInTouch[currentLanguage] },
    {
      type: "paragraph",
      content: `${words.ContactDetails[currentLanguage]} support@${appName.toLowerCase()}.com, ${words.CallSupport[currentLanguage]} (123) 456-7890. ${words.ResponseTime[currentLanguage]}`
    },
    { type: "header", content: words.SocialMedia[currentLanguage] },
    {
      type: "paragraph",
      content: `${words.SocialMediaFollow[currentLanguage]} ${appName}.`
    },
    {
      type: `component`,
      content: <SocialMediaBlock />,
    },
  ];
};

export default message;
