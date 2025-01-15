import { Fragment, useState } from "react";
import { Platform, View } from "react-native";
import { FullWindowOverlay } from "react-native-screens";
import * as Clipboard from "expo-clipboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { PortalHost } from "@rn-primitives/portal";
import {
  ArrowRight,
  ClipboardCheck,
  ClipboardIcon,
  Handshake,
  Info,
  Plus,
  Send,
  UserRoundCheck,
} from "lucide-react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getBaseUrl } from "@homefront/app/utils/base-url";
import { api } from "@homefront/app/utils/trpc";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormField,
  FormInput,
  FormSelect,
  Input,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from "@homefront/ui";

import { useInviteStore } from "./store";

const CUSTOM_PORTAL_HOST_NAME = "modal-example";
const WindowOverlay = Platform.OS === "ios" ? FullWindowOverlay : Fragment;

interface Invite {
  code: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  used: boolean;
  expiresAt: Date;
  note?: string | undefined;
  sent?: boolean;
}

enum InviteStep {
  Create = "Create",
  Send = "Send",
  Continue = "Continue",
}

const getTitle = (step: InviteStep) => {
  switch (step) {
    case InviteStep.Create:
      return "Invite someone you trust";
    case InviteStep.Send:
      return "Send them the link";
    case InviteStep.Continue:
      return "Great work!";
  }
};

export const CreateInviteDialog = () => {
  const [step, setStep] = useState<InviteStep>(InviteStep.Create);
  const [isOpen, setIsOpen] = useState(false);
  const [_inviteCode, setInviteCode] = useState<string | null>(null);
  const [invite, setInvite] = useState<Invite | null>(null);
  const [copied, setCopied] = useState(false);

  const addInvite = useInviteStore((state) => state.addInvite);
  const updateInvite = useInviteStore((state) => state.updateInvite);
  const invitesCount = useInviteStore((state) => state.invites.length);

  const formSchema = z.object({
    note: z.string().optional(),
    expires: z.object({
      value: z.string(),
      label: z.string(),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      expires: { value: "1", label: "1" },
    },
  });

  const createInvite = api.invites.createInvite.useMutation({
    onSuccess: async (data) => {
      const invite = { ...data, note: form.getValues("note"), sent: false };
      setInviteCode(invite.code);
      await Clipboard.setStringAsync(invite.code);
      addInvite(invite);
      form.reset();
      setInvite(invite);
      setStep(InviteStep.Send);
    },
  });

  const handleCreateInvite = async ({
    expires,
  }: z.infer<typeof formSchema>) => {
    const expiresInDays = Number(expires.value);
    await createInvite.mutateAsync({ expiresInDays });
  };

  const url: string = invite ? `${getBaseUrl()}/invites/${invite.code}` : "";

  const copyToClipboard = async () => {
    if (url) await Clipboard.setStringAsync(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const handleMarkAsSent = () => {
    if (invite) {
      updateInvite(invite.id, { sent: true });
      setStep(InviteStep.Continue);
    }
  };

  const handleSendAnotherInvite = () => {
    setInvite(null);
    setStep(InviteStep.Create);
  };

  return (
    <>
      <View className="py-4">
        <Form {...form}>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                className="flex-row items-center space-x-2 text-sm"
                onPress={() => setIsOpen(true)}
              >
                <Text>
                  <Plus size={24} />
                </Text>
                <Text>Invite someone you trust</Text>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-96">
              <DialogHeader>
                <View className="items-center py-4 text-primary">
                  {step === InviteStep.Create && <Handshake size={64} />}
                  {step === InviteStep.Send && <Send size={64} />}
                  {step === InviteStep.Continue && <UserRoundCheck size={64} />}
                </View>
                <DialogTitle className="pb-4 text-center">
                  {getTitle(step)}
                </DialogTitle>
              </DialogHeader>
              {step === InviteStep.Create && (
                <View className="space-y-4">
                  <Text className="text-sm">
                    A note is optional to help you remember who you invited. It
                    will only be visible to you and stored locally.
                  </Text>

                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormInput
                        label="Note to self"
                        placeholder="Add a note (optional)"
                        {...field}
                        value={field.value ?? ""}
                      />
                    )}
                  />
                  <View className="space-y-2 pb-2">
                    <Text className="text-sm">
                      For security purposes, we recommend you add as little
                      personally identifiable information (PII) as possible.
                    </Text>
                  </View>
                  <FormField
                    control={form.control}
                    name="expires"
                    render={({ field }) => (
                      <FormSelect
                        label="Expires in"
                        className="z-50"
                        {...field}
                        defaultValue={{ value: "1", label: "1 day" }}
                      >
                        <SelectTrigger>
                          <SelectValue
                            className="native:text-base text-sm text-foreground"
                            placeholder="Select expiration"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1" label="1 day">
                              1 day
                            </SelectItem>
                            <SelectItem value="2" label="2 days">
                              2 days
                            </SelectItem>
                            <SelectItem value="3" label="3 days">
                              3 days
                            </SelectItem>
                            <SelectItem value="4" label="4 days">
                              4 days
                            </SelectItem>
                            <SelectItem value="5" label="5 days">
                              5 days
                            </SelectItem>
                            <SelectItem value="6" label="6 days">
                              6 days
                            </SelectItem>
                            <SelectItem value="7" label="7 days">
                              7 days
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </FormSelect>
                    )}
                  />
                </View>
              )}
              {step === InviteStep.Send && (
                <View className="space-y-2 pb-4">
                  <View className="mb-4 flex-row items-start space-x-2 rounded-md border border-primary bg-primary-foreground p-2 text-primary">
                    <Info size={24} />
                    <Text className="text-sm text-primary">
                      This invite can only be used by one person.
                    </Text>
                  </View>
                  <Input value={url} selectTextOnFocus />

                  <Button
                    variant="outline"
                    className="group flex-row items-center space-x-2 text-primary"
                    onPress={copyToClipboard}
                  >
                    {copied ? (
                      <ClipboardCheck size={24} />
                    ) : (
                      <ClipboardIcon size={24} />
                    )}
                    <Text className="group-hover:text-primary">
                      Copy invite link
                    </Text>
                  </Button>
                </View>
              )}
              {step === InviteStep.Continue && (
                <View className="space-y-2">
                  {invitesCount > 1 ? (
                    <Text className="text-center text-sm">
                      You've invited {invitesCount} people so far!
                    </Text>
                  ) : (
                    <Text className="text-center text-sm">
                      You've sent your first invite!
                    </Text>
                  )}
                  <Text className="text-center text-sm">
                    If you'd like to invite someone else, you can create another
                    invite.
                  </Text>
                </View>
              )}
              <View className="space-y-2">
                {step === InviteStep.Create && (
                  <>
                    <Button
                      className="flex-row items-center space-x-2 text-sm"
                      onPress={form.handleSubmit(handleCreateInvite)}
                    >
                      <Text>Create invite</Text>
                      <Text>
                        <ArrowRight size={24} />
                      </Text>
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => {
                        form.reset({
                          note: "",
                          expires: { value: "1", label: "1" },
                        });
                        setIsOpen(false);
                      }}
                    >
                      <Text>Cancel</Text>
                    </Button>
                  </>
                )}
                {step === InviteStep.Send && (
                  <Button
                    className="flex-row items-center space-x-2 text-sm"
                    onPress={handleMarkAsSent}
                  >
                    <Text>Mark as sent</Text>
                    <Text>
                      <ArrowRight size={24} />
                    </Text>
                  </Button>
                )}

                {step === InviteStep.Continue && (
                  <>
                    <Button
                      className="flex-row items-center space-x-2 text-sm"
                      onPress={handleSendAnotherInvite}
                    >
                      <Text>Send another invite</Text>
                      <Text>
                        <ArrowRight size={24} />
                      </Text>
                    </Button>
                    <Button
                      variant="outline"
                      onPress={() => {
                        form.reset();
                        setStep(InviteStep.Create);
                        setIsOpen(false);
                      }}
                    >
                      <Text>I'm done inviting</Text>
                    </Button>
                  </>
                )}
              </View>
            </DialogContent>
          </Dialog>

          {/* <View className="space-y-2">
          <Text className="text-xl">Create an invite</Text>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormInput placeholder="Add a note (optional)" {...field} />
            )}
          />
          <Button onPress={form.handleSubmit(handleCreateInvite)}>
            <Text>Create Invite</Text>
          </Button>
          {_inviteCode && (
            <View>
              <Text>Invite Code: {_inviteCode}</Text>
              <Text>
                Invite code copied to clipboard. This invite is single-use and
                will expire in 7 days.
              </Text>
            </View>
          )}
        </View> */}
        </Form>
      </View>
      <WindowOverlay>
        <PortalHost name={CUSTOM_PORTAL_HOST_NAME} />
      </WindowOverlay>
    </>
  );
};
