import React from 'react';
import { Typography } from '@mui/material';
import { appName } from '@/app/config';
import words from './words'; // Import translations
import { useLanguageContext } from '@/contexts/LanguageContext'; // Import currentLanguage from context

export default function TermsContent() {
  const { currentLanguage } = useLanguageContext(); // Get current language from context

  return (
    <>
      <Typography variant="body1" paragraph>
        {words.Welcome[currentLanguage].replace('{appName}', appName)}
      </Typography>
      <Typography variant="h6">{words.UserResponsibilities[currentLanguage]}</Typography>
      <Typography variant="body2" paragraph>
        {words.UserResponsibilitiesDetails[currentLanguage].replace('{appName}', appName)}
      </Typography>
      <Typography variant="h6">{words.DataPrivacy[currentLanguage]}</Typography>
      <Typography variant="body2" paragraph>
        {words.DataPrivacyDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">{words.IntellectualProperty[currentLanguage]}</Typography>
      <Typography variant="body2" paragraph>
        {words.IntellectualPropertyDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">{words.LimitationOfLiability[currentLanguage]}</Typography>
      <Typography variant="body2" paragraph>
        {words.LimitationOfLiabilityDetails[currentLanguage].replace('{appName}', appName)}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.Acknowledge[currentLanguage]}
      </Typography>
    </>
  );
}
