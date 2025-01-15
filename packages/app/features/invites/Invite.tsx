import { useState } from "react";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import {
  CalendarClock,
  ClipboardCheck,
  ClipboardIcon,
  MailCheck,
  MailPlus,
  NotepadText,
} from "lucide-react-native";

import { getBaseUrl } from "@homefront/app/utils/base-url";
import dayjs from "@homefront/dayjs";
import { Button, cn, Text } from "@homefront/ui";

import { useInviteStore } from "./store";

interface InviteProps {
  invite: {
    code: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    used: boolean;
    expiresAt: Date;
    note?: string | undefined;
    sent?: boolean;
  };
}

const formatExpiresTime = (expiresAt: Date) => {
  const time = dayjs(expiresAt).format("h:mm A");
  const date = dayjs(expiresAt).format("MMM D");
  return `${date} at ${time}`;
};

export const Invite = ({ invite }: InviteProps) => {
  const url = `${getBaseUrl()}/invites/${invite.code}`;
  const updateInvite = useInviteStore((state) => state.updateInvite);
  const [copied, setCopied] = useState(false);

  const handleMarkAsSent = () => {
    updateInvite(invite.id, { sent: true });
  };

  const handleUndoMarkAsSent = () => {
    updateInvite(invite.id, { sent: false });
  };

  const copyToClipboard = async () => {
    if (url) await Clipboard.setStringAsync(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <View className="pb-0 pt-2">
      {!!invite.note && (
        <View className="flex-row items-center justify-start space-x-2 px-4 pb-0 pt-2">
          <NotepadText size={16} className="text-gray-600" />
          <Text className="text-sm text-gray-700">{invite.note}</Text>
        </View>
      )}
      <View className="flex-row items-center justify-start">
        <Text className="min-w-36 px-4 py-2 font-mono text-sm font-bold text-primary-900">
          {invite.code}
        </Text>
        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 flex-row items-center space-x-2 pl-4 text-gray-500">
            <CalendarClock size={16} />
            <Text className="text-sm text-gray-500">
              {formatExpiresTime(invite.expiresAt)}
            </Text>
          </View>
          <Button
            className={cn(
              "text-gray-500 hover:text-primary",
              copied && "text-primary",
            )}
            variant="ghost"
            onPress={copyToClipboard}
          >
            {copied ? (
              <ClipboardCheck size={16} />
            ) : (
              <ClipboardIcon size={16} />
            )}
          </Button>
          {invite.sent ? (
            <Button
              className="text-primary"
              variant="ghost"
              onPress={handleUndoMarkAsSent}
            >
              <MailCheck size={16} />
            </Button>
          ) : (
            <Button
              className="text-gray-500 hover:text-primary"
              variant="ghost"
              onPress={handleMarkAsSent}
            >
              <MailPlus size={16} />
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};
