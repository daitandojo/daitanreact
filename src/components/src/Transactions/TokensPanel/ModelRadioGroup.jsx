import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useLanguage } from "myreact";
import { useProvider } from "../../../contexts/ProviderContext";
import words from "./TokensPanel-language";

function ModelRadioGroup({ provider, setProvider }) {
  const { currentLanguage } = useLanguage();
  const { saveProviderToDB } = useProvider();

  const handleModelChange = (event) => {
    const updatedProvider = {
      ...provider,
      paymentmodel: parseInt(event.target.value, 10), // Ensure it's an integer
    };
    setProvider(updatedProvider);
    saveProviderToDB(updatedProvider);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        {words.SelectModel[currentLanguage]}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={String(provider?.paymentmodel)} // Ensure the value is a string
        onChange={handleModelChange}
      >
        <FormControlLabel
          value="1"
          control={<Radio />}
          label={words.ClientByClient[currentLanguage]}
        />
        <FormControlLabel
          value="2"
          control={<Radio />}
          label={words.SpeedyGrowth[currentLanguage]}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default ModelRadioGroup;
