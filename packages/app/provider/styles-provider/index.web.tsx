/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { StyleSheet } from "react-native";
import { useServerInsertedHTML } from "next/navigation";

export const StylesProvider = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => {
    const sheet = StyleSheet.getSheet();
    return (
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  });
  return <>{children}</>;
};
