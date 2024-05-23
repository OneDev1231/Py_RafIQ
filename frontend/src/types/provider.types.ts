import React from "react";

export type Provider<Elements = void> = React.FC<{
  children: React.ReactNode;
  extraData?: {
    elements: Elements;
  };
}>;
