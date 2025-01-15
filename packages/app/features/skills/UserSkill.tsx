import { useState } from "react";
import { View } from "react-native";
import {
  Book,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Plus,
  Trash,
} from "lucide-react-native";

import { api } from "@homefront/app/utils/trpc";
import {
  Chevron1,
  Chevron2,
  Chevron3,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Text,
} from "@homefront/ui";

export interface UserSkillProps {
  skill: {
    id: string;
    title: string;
    description: string | null;
    hasSkill: boolean;
    userLevel: string | null;
  };
  isScrolling: boolean;
}

type UserLevel =
  | "want_to_learn"
  | "learning"
  | "beginner"
  | "intermediate"
  | "expert"
  | undefined
  | null;

export const UserSkill = ({ skill, isScrolling = false }: UserSkillProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const createUserSkill = api.skills.createUserSkill.useMutation({
    onError: () => {
      setHasSkill(false);
    },
  });
  const updateUserSkill = api.skills.updateUserSkill.useMutation({});
  const deleteUserSkill = api.skills.deleteUserSkill.useMutation({
    onError: () => {
      setHasSkill((prev) => !prev);
    },
  });
  const [hasSkill, setHasSkill] = useState(skill.hasSkill);
  const [userLevel, setUserLevel] = useState<UserLevel>(
    skill.userLevel as UserLevel,
  );

  const handlePressLevel = async (level: UserLevel) => {
    setUserLevel(level);
    if (hasSkill) {
      await updateUserSkill.mutateAsync({
        skillId: skill.id,
        level: level ?? null,
      });
    } else {
      setHasSkill(true);
      await createUserSkill.mutateAsync({
        skillId: skill.id,
        level: level ?? null,
      });
    }
  };

  const handlePressDelete = async () => {
    setHasSkill(false);
    setUserLevel(null);
    await deleteUserSkill.mutateAsync({
      skillId: skill.id,
    });
  };

  const handleOpen = (nextOpen: boolean) => {
    setIsOpen(nextOpen);
  };

  return (
    <DropdownMenu className="max-w-full flex-wrap" onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild disabled={isScrolling}>
        <View
          key={skill.id}
          className={cn(
            "flex-1 flex-row flex-wrap items-center space-x-2 rounded-md border px-3 py-2 text-sm hover:cursor-pointer",
            hasSkill
              ? "border-primary bg-primary hover:bg-primary-700"
              : "border-gray-200 hover:bg-gray-100",
            isOpen && hasSkill && "bg-primary-700",
            isOpen && !hasSkill && "border-gray-300 bg-gray-100",
          )}
        >
          {hasSkill ? (
            <>
              {userLevel === "beginner" && (
                <Chevron1 size={16} className="text-primary-foreground" />
              )}
              {userLevel === "intermediate" && (
                <Chevron2 size={16} className="text-primary-foreground" />
              )}
              {userLevel === "expert" && (
                <Chevron3 size={16} className="text-primary-foreground" />
              )}
              {userLevel === "want_to_learn" && (
                <Lightbulb size={16} className="text-primary-foreground" />
              )}
              {userLevel === "learning" && (
                <BookOpen size={16} className="text-primary-foreground" />
              )}
              {userLevel === null && (
                <Check size={16} className="text-primary-foreground" />
              )}
            </>
          ) : (
            <Plus size={16} className="text-gray-800" />
          )}
          <Text
            className={cn(
              "flex-1 flex-wrap text-sm",
              hasSkill ? "text-primary-foreground" : "text-gray-800",
            )}
          >
            {skill.title}
          </Text>
          {isOpen ? (
            <ChevronUp
              size={16}
              className={cn(
                hasSkill ? "text-primary-foreground" : "text-gray-800",
              )}
            />
          ) : (
            <ChevronDown
              size={16}
              className={cn(
                hasSkill ? "text-primary-foreground" : "text-gray-800",
              )}
            />
          )}
        </View>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="native:w-72 w-64">
        <DropdownMenuGroup>
          <DropdownMenuItem onPress={() => handlePressLevel("beginner")}>
            <View className="flex-row items-center space-x-2">
              <Chevron1 size={16} className="text-primary" />
              <Text>Beginner</Text>
            </View>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => handlePressLevel("intermediate")}>
            <View className="flex-row items-center space-x-2">
              <Chevron2 size={16} className="text-primary" />
              <Text>Intermediate</Text>
            </View>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => handlePressLevel("expert")}>
            <View className="flex-row items-center space-x-2">
              <Chevron3 size={16} className="text-primary" />
              <Text>Expert</Text>
            </View>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onPress={() => handlePressLevel("want_to_learn")}>
            <View className="flex-row items-center space-x-2">
              <Lightbulb size={16} className="text-primary" />
              <Text>Want to learn</Text>
            </View>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => handlePressLevel("learning")}>
            <View className="flex-row items-center space-x-2">
              <Book size={16} className="text-primary" />
              <Text>Learning</Text>
            </View>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {hasSkill && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onPress={handlePressDelete}
              >
                <View className="flex-row items-center space-x-2">
                  <Trash size={16} className="text-destructive" />
                  <Text>Remove</Text>
                </View>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
