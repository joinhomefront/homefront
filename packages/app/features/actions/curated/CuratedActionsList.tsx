import type { DraggableStackProps } from "@mgcrea/react-native-dnd";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  DndProvider,
  Draggable,
  DraggableStack,
} from "@mgcrea/react-native-dnd";

import { api } from "@homefront/app/utils/trpc";

import { generateNewRank } from "../utils";
import { CuratedActionItem } from "./CuratedActionItem";

export function CuratedActionsList() {
  const { data: curatedActions } = api.actions.getCuratedActions.useQuery();
  const [items, setItems] = useState(curatedActions ?? []);

  const utils = api.useUtils();
  const updatePosition = api.actions.updateCuratedAction.useMutation({
    onSuccess: () => {
      void utils.actions.getCuratedActions.invalidate();
    },
  });

  useEffect(() => {
    setItems(curatedActions ?? []);
  }, [curatedActions]);

  const onOrderUpdate: DraggableStackProps["onOrderChange"] = (nextOrder) => {
    // Get current order
    const currentOrder = items.map((item) => item.id.toString());

    // Find which item moved
    const movedId = nextOrder.find(
      (id, index) => id.toString() !== currentOrder[index],
    );
    if (!movedId) return;

    // Get indices
    const fromIndex = currentOrder.indexOf(movedId.toString());
    const toIndex = nextOrder.indexOf(movedId.toString());
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

    // Create new array and handle reordering
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    if (!movedItem) return;
    newItems.splice(toIndex, 0, movedItem);

    // Get surrounding items for rank calculation
    const prevItem = toIndex > 0 ? newItems[toIndex - 1] : undefined;
    const nextItem =
      toIndex < newItems.length - 1 ? newItems[toIndex + 1] : undefined;

    const newRank = generateNewRank(prevItem, nextItem, movedItem);

    // Update state and persist
    setItems(newItems);
    updatePosition.mutate({
      id: movedItem.id,
      position: newRank.toString(),
    });
  };

  return (
    <View className="flex-1">
      <DndProvider>
        <DraggableStack direction="row" onOrderChange={onOrderUpdate}>
          {items.map((item) => (
            <Draggable key={item.id} id={item.id}>
              <CuratedActionItem item={item} />
            </Draggable>
          ))}
        </DraggableStack>
      </DndProvider>
    </View>
  );
}
