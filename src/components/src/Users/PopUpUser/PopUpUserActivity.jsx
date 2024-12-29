import React from "react";

import { BulletList, ListItem } from "myreact";
import { useUser } from "myreact";

export default function PopUpUserActivity({ shallowUser, setShallowUser }) {
  const { user } = useUser();

  if (!user) return null;

  return (
    <BulletList>
      <ListItem>{`First name: ${shallowUser?.firstname}`}</ListItem>
      <ListItem>{`Last name: ${shallowUser?.lastname}`}</ListItem>
      <ListItem>{`Location: ${shallowUser?.location}`}</ListItem>
      <ListItem>{`Country: ${shallowUser?.country}`}</ListItem>
      <ListItem>{`Email address: ${shallowUser?.username}`}</ListItem>
      <ListItem>{`Mobile: ${shallowUser?.mobile}`}</ListItem>
      <ListItem>{`Language: ${shallowUser?.language}`}</ListItem>
      <ListItem>{`# Requests: ${shallowUser?.requests?.length}`}</ListItem>
      <ListItem>{`Rewards Accrued: ${shallowUser?.rewardsaccrued}`}</ListItem>
      <ListItem>{`Rewards Paid: ${shallowUser?.rewardspaid}`}</ListItem>
    </BulletList>
  );
}
