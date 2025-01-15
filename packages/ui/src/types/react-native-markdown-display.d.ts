import { default as ReactNativeMarkdown } from "react-native-markdown-display";

declare module "react-native-markdown-display" {
  export * from "react-native-markdown-display";
  export default ReactNativeMarkdown;

  export function openUrl(
    url: string,
    onLinkPress?: (url: string) => boolean,
  ): Promise<boolean>;

  export type Rules = Record<string, RuleFunction>;

  export type RenderRules = Record<string, (
      node: ASTNode,
      children: React.ReactNode[],
      parent: ASTNode[],
      styles: unknown,
      ...args: unknown[]
    ) => React.ReactNode>;
}
