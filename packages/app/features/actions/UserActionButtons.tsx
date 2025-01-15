import { View } from "react-native";
import { Check, Ellipsis, ListTodo, Trash } from "lucide-react-native";

import type { Action } from "@homefront/db";
import { api } from "@homefront/app/utils/trpc";
import {
  ActivityIndicator,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Text,
} from "@homefront/ui";

interface CompleteButtonProps {
  completeDisabled: boolean;
  handleComplete: () => void;
  isLoading: boolean;
}

function CompleteButton({
  completeDisabled,
  handleComplete,
  isLoading,
}: CompleteButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onPress={handleComplete}
      disabled={completeDisabled}
      className="web:hover:bg-gray-100 flex-row items-center space-x-2 border-gray-400 hover:border-gray-500"
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Check
            size={16}
            className="text-gray-700 group-hover:text-gray-600 group-active:text-gray-700"
          />
          <Text className="text-sm text-gray-700 group-hover:text-gray-600 group-active:text-gray-700">
            Mark complete
          </Text>
        </>
      )}
    </Button>
  );
}

interface UserActionButtonsProps {
  action: Action;
}

export function UserActionButtons({ action }: UserActionButtonsProps) {
  const utils = api.useUtils();

  const { data: userAction, isLoading } =
    api.actions.getUserActionByActionId.useQuery(action.id);

  const createUserAction = api.actions.createUserAction.useMutation({
    onSuccess: () => {
      void utils.actions.getUserActionByActionId.invalidate();
    },
  });

  const updateUserAction = api.actions.updateUserAction.useMutation({
    onSuccess: () => {
      void utils.actions.getUserActionByActionId.invalidate();
    },
  });

  const deleteUserAction = api.actions.deleteUserAction.useMutation({
    onSuccess: () => {
      void utils.actions.getUserActionByActionId.invalidate();
    },
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const handleCreateUserAction = () => {
    createUserAction.mutate({ actionId: action.id });
  };

  const handleCreateCompletedUserAction = () => {
    createUserAction.mutate({ actionId: action.id, completed: true });
  };

  const addDisabled =
    createUserAction.isPending || (!!userAction && !("data" in userAction));

  if (!userAction || "data" in userAction) {
    return (
      <View className="flex-row items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onPress={handleCreateUserAction}
          disabled={addDisabled}
          className="flex-row items-center space-x-2"
        >
          {createUserAction.isPending ? (
            <ActivityIndicator />
          ) : (
            <>
              <ListTodo size={16} className="text-primary" />
              <Text className="text-sm">Add to list</Text>
            </>
          )}
        </Button>
        <CompleteButton
          completeDisabled={addDisabled}
          handleComplete={handleCreateCompletedUserAction}
          isLoading={createUserAction.isPending}
        />
      </View>
    );
  }

  const handleRemoveUserAction = () => {
    deleteUserAction.mutate(userAction.id);
  };

  const removeDisabled = deleteUserAction.isPending || !userAction;

  const handleComplete = () => {
    updateUserAction.mutate({ ...userAction, completed: true });
  };

  const completeDisabled = updateUserAction.isPending || !userAction;

  const handleUndoComplete = () => {
    updateUserAction.mutate({ ...userAction, completed: false });
  };

  const undoCompleteDisabled = updateUserAction.isPending || !userAction;

  return (
    <View className="flex-row items-center justify-between space-x-2">
      {userAction.completed ? (
        <Button
          variant="outline"
          size="sm"
          onPress={handleUndoComplete}
          disabled={undoCompleteDisabled}
          className="flex-row items-center space-x-2 border-border bg-primary"
        >
          {updateUserAction.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Check size={16} className="text-white" />
              <Text className="text-sm text-white">Completed</Text>
            </>
          )}
        </Button>
      ) : (
        <CompleteButton
          completeDisabled={completeDisabled}
          handleComplete={handleComplete}
          isLoading={updateUserAction.isPending}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="web:hover:bg-gray-100 group active:bg-gray-100"
          >
            {deleteUserAction.isPending ? (
              <ActivityIndicator />
            ) : (
              <Ellipsis size={24} className="text-gray-700" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            variant="destructive"
            onPress={handleRemoveUserAction}
            disabled={removeDisabled}
          >
            <View className="flex-row items-center space-x-2">
              <Trash size={16} className="text-destructive" />
              <Text>Remove from list</Text>
            </View>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
