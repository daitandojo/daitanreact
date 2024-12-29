import React, { useState, Suspense } from "react";
import { useRouter } from "next/router";
import { IconButton } from "@mui/material";
import {
  Storefront,
  Handshake,
  CreditCard,
  Login,
  Logout,
} from "@mui/icons-material";
import { useUser, useLanguage, StyledTag } from "myreact";
import { useRequest } from "../../contexts/RequestContext";
import words from "./Tags-language";
import { logOut } from "daitanjs/mongo";

const PopUpProviderIntro = React.lazy(() =>
  import("../../Providers/PopUpProviderIntro/PopUpProviderIntro")
);
const PopUpAffiliate = React.lazy(() =>
  import("../../Affiliates/PopUpAffiliate/PopUpAffiliate")
);
const PopUpTokens = React.lazy(() =>
  import("../../Transactions/PopUpTokens/PopUpTokens")
);
const PopUpLogin = React.lazy(() =>
  import("../../Users/PopUpLogin/PopUpLogin")
);

const Tags = () => {
  const router = useRouter();
  const { user, loggedIn } = useUser();
  const { currentLanguage } = useLanguage();
  const { myTasks, myRequests } = useRequest();

  const [modal, setModal] = useState("");

  const handleLogout = () => {
    logOut();
  };

  const newTasks =
    myTasks?.filter(
      (r) =>
        !r.doneby &&
        !r.userdiscarded &&
        r.submitted &&
        r.paidforby.every((p) => p._id !== user?.provider?._id)
    ) || [];

  const newRequests =
    myRequests?.filter((r) => !r.doneby && !r.userdiscarded && r.submitted) ||
    [];

  const tags = [
    {
      visible: true,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (user?.provider) {
          router.push(`/editprovider/${user.provider._id}/Overall`);
        } else {
          setModal("showProviderIntro");
        }
      },
      icon: <Storefront />,
      label: user?.provider
        ? words.YourBusiness[currentLanguage]
        : words.Professionals[currentLanguage],
    },
    {
      visible: !!user?.provider && myTasks?.length > 0,
      onClick: () => router.push("/tasksforme"),
      icon: <Handshake />,
      label: `${words.BrowseTasks[currentLanguage]} (${newTasks?.length})`,
    },
    {
      visible: myRequests.length > 0,
      onClick: () => router.push("/requestsfromme"),
      icon: <Handshake />,
      label: `${words.BrowseRequests[currentLanguage]} (${newRequests.length})`,
    },
    {
      visible: !!(user?.provider && user?.provider?.businessname),
      onClick: () => setModal("showTokens"),
      icon: <CreditCard />,
      label: `${words.Tokens[currentLanguage]} (${
        user?.provider?.tokens || 0
      })`,
    },
    // {
    //   visible: true,
    //   onClick: () => setModal('showAffiliate'),
    //   icon: <Handshake />,
    //   label: words.Affiliates[currentLanguage],
    // },
    {
      visible: !loggedIn,
      onClick: () => setModal("showLogin"),
      icon: <Login />,
      label: words.MenuLogin[currentLanguage],
    },
    {
      visible: loggedIn,
      onClick: handleLogout,
      icon: <Logout />,
      label: words.LogOut[currentLanguage],
    },
  ];

  return (
    <>
      {tags
        .filter((tag) => tag.visible)
        .map((tag, index) => (
          <StyledTag key={index} onClick={tag.onClick}>
            <IconButton>{tag.icon}</IconButton>
            {tag.label}
          </StyledTag>
        ))}

      {modal === "showProviderIntro" && (
        <Suspense fallback={<div></div>}>
          <PopUpProviderIntro onClose={() => setModal("")} />
        </Suspense>
      )}
      {modal === "showTokens" && (
        <Suspense fallback={<div></div>}>
          <PopUpTokens onClose={() => setModal("")} />
        </Suspense>
      )}
      {modal === "showAffiliate" && (
        <Suspense fallback={<div></div>}>
          <PopUpAffiliate onClose={() => setModal("")} />
        </Suspense>
      )}
      {modal === "showLogin" && (
        <Suspense fallback={<div></div>}>
          <PopUpLogin
            onClose={() => setModal("")}
            onLoginAborted={() => setModal("")}
          />
        </Suspense>
      )}
    </>
  );
};

export default Tags;
