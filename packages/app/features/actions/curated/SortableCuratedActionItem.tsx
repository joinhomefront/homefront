import { Platform, View } from "react-native";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Action, CuratedAction } from "@homefront/db";

import { CuratedActionItem } from "./CuratedActionItem";

interface Props {
  item: Action & CuratedAction;
}

export function SortableCuratedActionItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (Platform.OS === "web") {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <CuratedActionItem item={item} />
      </div>
    );
  }

  // TODO: Implement for native
  return (
    <View style={style}>
      <CuratedActionItem item={item} />
    </View>
  );
}
