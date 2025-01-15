import type { DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { api } from "@homefront/app/utils/trpc";

import { generateNewRank } from "../utils";
import { SortableCuratedActionItem } from "./SortableCuratedActionItem";

export function CuratedActionsList() {
  const { data: curatedActions } = api.actions.getCuratedActions.useQuery();
  const [items, setItems] = useState(curatedActions ?? []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const utils = api.useUtils();
  const updatePosition = api.actions.updateCuratedAction.useMutation({
    onSuccess: () => {
      void utils.actions.getCuratedActions.invalidate();
    },
  });

  useEffect(() => {
    setItems(curatedActions ?? []);
  }, [curatedActions]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);

    // Get surrounding items for rank calculation
    const movedItem = items[oldIndex];
    if (!movedItem) return;

    const prevItem = newIndex > 0 ? newItems[newIndex - 1] : undefined;
    const nextItem =
      newIndex < newItems.length - 1 ? newItems[newIndex + 1] : undefined;

    const newRank = generateNewRank(prevItem, nextItem, movedItem);

    setItems(newItems);
    updatePosition.mutate({
      id: movedItem.id,
      position: newRank.toString(),
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableCuratedActionItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
