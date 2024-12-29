import React from 'react';
import { Typography } from '@mui/material';
import { appName } from '@/app/config';
import words from './words'; // Import translations
import { useLanguageContext } from '@/contexts/LanguageContext'; // Import currentLanguage from context

export default function PrivacyContent() {
  const { currentLanguage } = useLanguageContext(); // Get current language from context

  return (
    <>
      <Typography variant="body1" paragraph>
        {words.PrivacyIntro[currentLanguage].replace('{appName}', appName)}
      </Typography>
      <Typography variant="h6">
        {words.DataCollection[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.DataCollectionDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">
        {words.DataUsage[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.DataUsageDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">
        {words.DataSharing[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.DataSharingDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">
        {words.DataSecurity[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.DataSecurityDetails[currentLanguage]}
      </Typography>
      <Typography variant="h6">
        {words.YourRights[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.YourRightsDetails[currentLanguage]}
      </Typography>
      <Typography variant="body2" paragraph>
        {words.MoreInfo[currentLanguage]}
      </Typography>
    </>
  );
}
