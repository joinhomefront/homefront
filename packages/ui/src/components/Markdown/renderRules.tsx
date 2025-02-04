import type { CSSProperties } from "react";
import type { ImageStyle } from "react-native";
import type { RenderRules } from "react-native-markdown-display";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { hasParents, openUrl } from "react-native-markdown-display";
import { SolitoImage } from "solito/image";

import { Card } from "../../components/card";
import { Separator } from "../../components/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/table";
import { Text, TextClassContext } from "../../components/text";
import { BlockQuote, H1, H2, H3, H4 } from "../../components/typography";

interface ImageProps {
  src: string;
  alt?: string;
  style?: CSSProperties | ImageStyle;
}

const Image = Platform.select({
  web: ({ src, alt, style }: ImageProps) => (
    <img src={src} alt={alt} style={style as CSSProperties} />
  ),
  default: ({ src, alt, style }: ImageProps) => (
    <SolitoImage
      style={style as ImageStyle}
      src={src}
      alt={alt ?? ""}
      fill
      unoptimized
    />
  ),
});

const rules = {
  // Core containers
  unknown: () => null,

  body: (node, children) => (
    <View key={node.key} className="gap-y-4">
      {children}
    </View>
  ),

  // Typography
  heading1: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-4xl font-extrabold tracking-tight"
    >
      <H1>{children}</H1>
    </TextClassContext.Provider>
  ),

  heading2: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-3xl font-semibold tracking-tight"
    >
      <H2>{children}</H2>
    </TextClassContext.Provider>
  ),

  heading3: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      <H3>{children}</H3>
    </TextClassContext.Provider>
  ),

  heading4: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-lg font-semibold tracking-tight"
    >
      <H4>{children}</H4>
    </TextClassContext.Provider>
  ),

  heading5: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-lg font-semibold tracking-tight"
    >
      <Text>{children}</Text>
    </TextClassContext.Provider>
  ),

  heading6: (node, children) => (
    <TextClassContext.Provider
      key={node.key}
      value="web:scroll-m-20 text-base font-bold tracking-tight"
    >
      <Text>{children}</Text>
    </TextClassContext.Provider>
  ),

  // Elements
  hr: (node) => <Separator key={node.key} className="my-4" />,

  // Text formatting
  strong: (node, children) => (
    <Text key={node.key} className="font-bold">
      {children}
    </Text>
  ),

  em: (node, children) => (
    <Text key={node.key} className="italic">
      {children}
    </Text>
  ),

  s: (node, children) => (
    <Text key={node.key} className="line-through">
      {children}
    </Text>
  ),

  blockquote: (node, children) => (
    <BlockQuote key={node.key}>{children}</BlockQuote>
  ),

  // Lists
  bullet_list: (node, children) => (
    <View key={node.key} className="ml-6 gap-y-2">
      {children}
    </View>
  ),

  ordered_list: (node, children) => (
    <View key={node.key} className="ml-6 gap-y-2">
      {children}
    </View>
  ),

  list_item: (node, children, parent) => {
    if (hasParents(parent, "bullet_list")) {
      return (
        <View key={node.key} className="flex-row items-start gap-x-2">
          <Text className="text-foreground">•</Text>
          <View className="flex-1">{children}</View>
        </View>
      );
    }

    if (hasParents(parent, "ordered_list")) {
      const orderedListIndex = parent.findIndex(
        (el: { type: string }) => el.type === "ordered_list",
      );
      const orderedList = parent[orderedListIndex] as
        | { attributes: { start: number } }
        | undefined;
      const listItemNumber = orderedList?.attributes.start
        ? orderedList.attributes.start + node.index
        : node.index + 1;

      return (
        <View key={node.key} className="flex-row items-start gap-x-2">
          <Text className="text-foreground">{listItemNumber}.</Text>
          <View className="flex-1">{children}</View>
        </View>
      );
    }

    return (
      <View key={node.key} className="flex-1">
        {children}
      </View>
    );
  },

  // Code
  code_inline: (node) => (
    <Text
      key={node.key}
      className="rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm"
    >
      {node.content}
    </Text>
  ),

  code_block: (node) => {
    const content = node.content.replace(/\n$/, "");
    return (
      <Card
        key={node.key}
        className="my-6 overflow-x-auto border-gray-400 bg-gray-100 p-4"
      >
        <Text className="font-mono text-sm">{content}</Text>
      </Card>
    );
  },

  fence: (node) => {
    const content = node.content.replace(/\n$/, "");
    return (
      <Card
        key={node.key}
        className="my-6 overflow-x-auto border-gray-400 bg-gray-100 p-4"
      >
        <Text className="font-mono text-sm">{content}</Text>
      </Card>
    );
  },

  // Tables
  table: (node, children) => <Table key={node.key}>{children}</Table>,

  thead: (node, children) => (
    <TableHeader key={node.key}>{children}</TableHeader>
  ),

  tbody: (node, children) => <TableBody key={node.key}>{children}</TableBody>,

  tr: (node, children) => <TableRow key={node.key}>{children}</TableRow>,

  td: (node, children) => (
    <TableCell key={node.key} className="flex-1 flex-wrap">
      {children}
    </TableCell>
  ),

  th: (node, children) => (
    <TableCell key={node.key} className="flex-1 flex-wrap font-medium">
      {children}
    </TableCell>
  ),

  // Links & Images
  link: (node, children, parent, styles: { link: object }, onLinkPress) => (
    <TextClassContext.Provider
      key={node.key}
      value="text-primary hover:text-primary-700 hover:underline"
    >
      <Text
        className="text-primary"
        style={styles.link}
        onPress={async () => {
          if (typeof node.attributes.href === "string") {
            await openUrl(node.attributes.href, onLinkPress);
          }
        }}
      >
        {children}
      </Text>
    </TextClassContext.Provider>
  ),
  blocklink: (
    node,
    children,
    parent,
    styles: { blocklink: object; image: object },
    onLinkPress,
  ) => (
    <TouchableWithoutFeedback
      key={node.key}
      onPress={async () => {
        if (typeof node.attributes.href === "string") {
          await openUrl(node.attributes.href, onLinkPress);
        }
      }}
      style={styles.blocklink}
    >
      <View style={styles.image}>{children}</View>
    </TouchableWithoutFeedback>
  ),

  image: (
    node,
    children,
    parent,
    styles: { _VIEW_SAFE_image: object },
    allowedImageHandlers,
    defaultImageHandler,
  ) => {
    const { src, alt } = node.attributes;

    const show = allowedImageHandlers.some(
      (handler) =>
        typeof src === "string" &&
        typeof handler === "string" &&
        src.toLowerCase().startsWith(handler.toLowerCase()),
    );

    if (!show) return null;

    const uri =
      typeof src === "string" && src.startsWith(defaultImageHandler)
        ? src
        : `${defaultImageHandler}${src}`;

    return (
      <Image
        src={uri}
        alt={alt as string | undefined}
        style={styles._VIEW_SAFE_image}
      />
    );
  },

  // Paragraphs & Text
  paragraph: (
    node,
    children,
    parent,
    styles: { _VIEW_SAFE_paragraph: object },
  ) => (
    <View key={node.key} style={styles._VIEW_SAFE_paragraph}>
      {children}
    </View>
  ),

  text: (node) => (
    <Text key={node.key} className="flex-1 flex-wrap">
      {node.content}
    </Text>
  ),

  textgroup: (node, children) => <Text key={node.key}>{children}</Text>,

  hardbreak: () => "\n",
  softbreak: () => "\n",
} satisfies RenderRules;

export default rules;
