import React from "react";

export const AppLayoutWrapper: React.FC<{ isLoggedIn: boolean }> = ({
  isLoggedIn,
}) => {
  return isLoggedIn ? <>Hello World!</> : <>Not Hello World!</>;
};
