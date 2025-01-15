import { useEffect, useState } from "react";
import { View } from "react-native";

import { api } from "@homefront/app/utils/trpc";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  Switch,
  Text,
} from "@homefront/ui";

import { BackupCodes } from "./BackupCodes";
import { DisableVerificationForm } from "./DisableVerificationForm";
import { QRDisplay } from "./QRDisplay";
import { VerificationForm } from "./VerificationForm";

enum TwoFactorSetupStep {
  START = "start",
  QR = "qr",
  VERIFY = "verify",
  BACKUP = "backup",
}

enum DisableStep {
  CONFIRM = "confirm",
  VERIFY = "verify",
}

interface TwoFactorSetupProps {
  isTwoFactorEnabled: boolean;
  userId: string;
}
export function TwoFactorSetup({
  isTwoFactorEnabled,
  userId,
}: TwoFactorSetupProps) {
  const [isChecked, setIsChecked] = useState<boolean>(isTwoFactorEnabled);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<TwoFactorSetupStep>(
    TwoFactorSetupStep.START,
  );
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [secret, setSecret] = useState<string | null>(null);
  const [isGeneratingSecret, setIsGeneratingSecret] = useState(false);
  const [isDisableOpen, setIsDisableOpen] = useState(false);
  const [disableStep, setDisableStep] = useState<DisableStep>(
    DisableStep.CONFIRM,
  );

  const utils = api.useUtils();

  const generateTwoFactorSecret = api.auth.generateTwoFactorSecret.useMutation({
    onSuccess: (twoFactorSecret) => {
      setSecret(twoFactorSecret);
    },
    onSettled: () => {
      setIsGeneratingSecret(false);
    },
  });

  const handleEnableTwoFactor = async () => {
    setIsOpen(true);
    setIsGeneratingSecret(true);
    await generateTwoFactorSecret.mutateAsync();
  };

  const handleDisable = () => {
    setIsDisableOpen(true);
    setDisableStep(DisableStep.CONFIRM);
  };

  const onDisableComplete = () => {
    setIsChecked(false);
    setIsDisableOpen(false);
    void utils.auth.getSession.invalidate();
  };

  const onSetupOpenChange = () => {
    if (isOpen) {
      if (step === TwoFactorSetupStep.START || step === TwoFactorSetupStep.QR) {
        setStep(TwoFactorSetupStep.START);
        setIsOpen(false);
        setSecret(null);
      }
    }
  };

  const onBack = () => {
    if (step === TwoFactorSetupStep.VERIFY) {
      setStep(TwoFactorSetupStep.QR);
    } else {
      throw new Error("Invalid step");
    }
  };

  const onCancel = () => {
    setIsOpen(false);
    setStep(TwoFactorSetupStep.START);
    setSecret(null);
  };

  const onComplete = () => {
    setIsChecked(true);
    setIsOpen(false);
    setStep(TwoFactorSetupStep.START);
    setSecret(null);
  };

  useEffect(() => {
    if (isTwoFactorEnabled !== isChecked) {
      setIsChecked(isTwoFactorEnabled);
    }
  }, [isTwoFactorEnabled]);

  const stepComponents = {
    start: (
      <View className="space-y-4">
        <DialogHeader>
          <Text className="text-xl font-bold">
            Set up two-factor authentication
          </Text>
        </DialogHeader>

        <Text className="text-sm">
          This process will enable Two-Factor Authentication (2FA) on your
          Homefront account.
        </Text>

        <Text className="text-sm">
          Enabling two-factor authentication will make your account more secure
          by requiring a second form of verification when signing in.
        </Text>

        <View className="flex-row justify-between space-x-4">
          <Button size="sm" variant="outline" onPress={() => setIsOpen(false)}>
            <Text>Cancel</Text>
          </Button>
          <Button
            size="sm"
            onPress={() => setStep(TwoFactorSetupStep.QR)}
            disabled={!secret || isGeneratingSecret}
          >
            <Text>Next</Text>
          </Button>
        </View>
      </View>
    ),

    qr: secret && (
      <QRDisplay
        secret={secret}
        onNext={() => setStep(TwoFactorSetupStep.VERIFY)}
        onCancel={onCancel}
      />
    ),
    verify: secret && (
      <VerificationForm
        secret={secret}
        userId={userId}
        onSuccess={(codes) => {
          setBackupCodes(codes);
          setStep(TwoFactorSetupStep.BACKUP);
        }}
        onBack={onBack}
      />
    ),
    backup: <BackupCodes codes={backupCodes} onComplete={onComplete} />,
  };

  const disableStepComponents = {
    confirm: (
      <View className="space-y-4">
        <DialogHeader>
          <Text className="text-xl font-bold">
            Disable two-factor authentication
          </Text>
        </DialogHeader>

        <Text className="text-sm">
          Disabling two-factor authentication will make your account less
          secure. Only proceed if absolutely necessarily.
        </Text>

        <View className="space-y-2">
          <Button
            size="sm"
            variant="destructive"
            onPress={() => setDisableStep(DisableStep.VERIFY)}
          >
            <Text>Disable</Text>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setIsDisableOpen(false)}
          >
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    ),
    verify: (
      <DisableVerificationForm
        userId={userId}
        onSuccess={onDisableComplete}
        onCancel={() => setIsDisableOpen(false)}
      />
    ),
  };

  return (
    <>
      <Switch
        checked={isChecked}
        onCheckedChange={async () => {
          if (isChecked) {
            handleDisable();
          } else {
            await handleEnableTwoFactor();
          }
        }}
      />

      <Dialog open={isOpen} onOpenChange={onSetupOpenChange}>
        <DialogContent
          className="min-w-96 max-w-96"
          overlayProps={{ closeOnPress: false }}
        >
          <View>{stepComponents[step]}</View>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDisableOpen}
        onOpenChange={(open) => !open && setIsDisableOpen(false)}
      >
        <DialogContent
          className="min-w-96 max-w-96"
          overlayProps={{ closeOnPress: false }}
        >
          <View>{disableStepComponents[disableStep]}</View>
        </DialogContent>
      </Dialog>
    </>
  );
}
