import { View } from "react-native";

import { Button, cn, Text } from "@homefront/ui";

import { TABS } from "./data";
import { Tab as TabType } from "./types";

interface TabProps {
  tab: TabType;
  active: boolean;
  disabled: boolean;
  onPress: () => void;
}

const Tab = ({ tab, active, disabled, onPress }: TabProps) => {
  return (
    <Button
      variant="tab"
      active={active}
      disabled={disabled}
      onPress={onPress}
      className={cn("px-4 py-2", active ? "text-primary" : "")}
    >
      <Text
        className={cn(active ? "text-primary" : "text-foreground", "font-bold")}
      >
        {tab.title}
      </Text>
    </Button>
  );
};

interface TabsProps {
  activeTab: string;
  onChange: (key: TabType["key"]) => void;
}

export const Tabs = ({ activeTab, onChange }: TabsProps) => {
  return (
    <View className="flex flex-row gap-4">
      {TABS.map((tab) => (
        <Tab
          key={tab.key}
          tab={tab}
          active={activeTab === tab.key}
          disabled={tab.key === "media" || tab.key === "text"}
          onPress={() => onChange(tab.key)}
        />
      ))}
    </View>
  );
};
