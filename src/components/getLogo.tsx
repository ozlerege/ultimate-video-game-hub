import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid,
  faApple,
  faPlaystation,
  faWindows,
  faXbox,
  faAppStoreIos,
} from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

interface GetLogoProps {
  platform: string;
  className?: string;
}

export const getLogo = ({
  platform,
  className,
}: GetLogoProps): React.ReactElement => {
  const getIcon = (platform: string): IconDefinition => {
    switch (platform.toLowerCase()) {
      case "playstation":
        return faPlaystation;
      case "xbox":
        return faXbox;
      case "pc":
        return faWindows;
      case "ios":
        return faAppStoreIos;
      case "android":
        return faAndroid;
      case "mac":
        return faApple;
      default:
        return faGamepad;
    }
  };

  return <FontAwesomeIcon icon={getIcon(platform)} className={className} />;
};
