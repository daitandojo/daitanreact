import React, { useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Email from "@mui/icons-material/Email";
import Language from "@mui/icons-material/Language";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, IconInput, useUser, useLanguage, FlexCenter } from "myreact";
import {
  languageSelection,
  countrySelection,
} from "../../../assets/appdata/appdata";
import words from "./PopUpUser-language";
import { isEmail, isPhone } from "daitanjs/validation";

const PopUpUserBasic = ({ shallowUser, setShallowUser, handleSaveUser }) => {
  const { user } = useUser();
  const {
    currentLanguage,
    setCurrentLanguage,
    currentCountry,
    setCurrentCountry,
  } = useLanguage();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setShallowUser(user);
  }, [user]);

  useEffect(() => {
    const disabled =
      !isEmail(shallowUser.email) ||
      !isPhone(shallowUser.mobile) ||
      shallowUser.firstname.length < 3 ||
      shallowUser.lastname.length < 3;
    setButtonDisabled(disabled);
  }, [
    shallowUser.email,
    shallowUser.mobile,
    shallowUser.firstname,
    shallowUser.lastname,
    shallowUser.language,
  ]);

  const handlesetUser = (field, value) => {
    alert(field);
    alert(value);
    setShallowUser((prevState) => ({
      ...prevState,
      [field]: value,
      verified:
        field === "email" || field === "mobile" ? false : prevState.verified,
    }));
  };

  return (
    <div style={{ margin: "30px" }}>
      <div style={{ margin: "30px" }}>{words.BasicIntro[currentLanguage]}</div>
      <FlexCenter>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            type="email"
            Icon={shallowUser.verified ? CheckCircleIcon : Email}
            value={shallowUser.email || ""}
            onChange={(e) => handlesetUser("email", e.target.value)}
            label={words.EmailPlaceholder[currentLanguage]}
          />
        </div>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            type="phone"
            defaultCountry={currentCountry?.toUpperCase() || "GB"}
            countryList={["es", "nl", "de", "gb", "dk"]}
            value={shallowUser.mobile || ""}
            onChange={(mobile) => handlesetUser("mobile", mobile)}
            label="WhatsApp"
          />
        </div>
      </FlexCenter>
      <FlexCenter>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            type="text"
            Icon={AccountCircle}
            value={shallowUser.firstname || ""}
            onChange={(e) => handlesetUser("firstname", e.target.value)}
            label={words.FirstNamePlaceholder[currentLanguage]}
          />
        </div>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            type="text"
            Icon={AccountCircle}
            value={shallowUser.lastname || ""}
            onChange={(e) => handlesetUser("lastname", e.target.value)}
            label={words.LastNamePlaceholder[currentLanguage]}
          />
        </div>
      </FlexCenter>
      <FlexCenter>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            fullWidth
            type="select"
            Icon={Language}
            label={words.Select[currentLanguage]}
            options={languageSelection()}
            value={shallowUser.language || currentLanguage}
            onChange={(e) => {
              setCurrentLanguage(e.target.value);
              handlesetUser("language", e.target.value);
            }}
          />
        </div>
        <div style={{ width: "50%", margin: "20px" }}>
          <IconInput
            fullWidth
            type="select"
            Icon={Language}
            label={words.Select[currentLanguage]}
            options={countrySelection()}
            value={shallowUser.country || currentCountry}
            onChange={(e) => {
              setCurrentCountry(e.target.value);
              handlesetUser("country", e.target.value);
            }}
          />
        </div>
        <Button
          label="Update"
          onClick={() => handleSaveUser(shallowUser)}
          disabled={buttonDisabled}
          variant="contained"
          color="primary"
          style={{ height: "56px", marginLeft: "20px" }}
        />
      </FlexCenter>
    </div>
  );
};

export default PopUpUserBasic;
