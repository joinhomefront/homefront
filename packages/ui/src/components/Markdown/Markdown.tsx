import type { PropsWithChildren } from "react";
import type { MarkdownProps } from "react-native-markdown-display";
import RNMDMarkdown from "react-native-markdown-display";

import rules from "./renderRules";

export function Markdown({ children }: PropsWithChildren<MarkdownProps>) {
  return <RNMDMarkdown rules={rules}>{children}</RNMDMarkdown>;
}
