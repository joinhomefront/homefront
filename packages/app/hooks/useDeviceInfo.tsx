"use client";

import { useEffect, useState } from "react";
import * as Device from "expo-device";

export interface BrowserInfo {
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isOpera: boolean;
  isBrowserOniOS: boolean;
}

export interface DeviceInfo {
  deviceType: Device.DeviceType;
  browser: BrowserInfo;
}

const getBrowserInfo = (): BrowserInfo => {
  const browser = typeof navigator !== "undefined" ? navigator.userAgent : "";

  return {
    isChrome: browser.includes("Chrome") || browser.includes("CriOS"),
    isSafari:
      browser.includes("Safari") &&
      !browser.includes("Chrome") &&
      !browser.includes("FxiOS") &&
      !browser.includes("Edg") &&
      !browser.includes("OPR"),
    isFirefox: browser.includes("Firefox") || browser.includes("FxiOS"),
    isEdge: browser.includes("Edg"),
    isOpera: browser.includes("OPR"),
    isBrowserOniOS: browser.includes("iOS"),
  };
};

export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: Device.DeviceType.UNKNOWN,
    browser: {
      isChrome: false,
      isSafari: false,
      isFirefox: false,
      isEdge: false,
      isOpera: false,
      isBrowserOniOS: false,
    },
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceType = await Device.getDeviceTypeAsync();
      const browserInfo = getBrowserInfo();

      setDeviceInfo({
        deviceType,
        browser: browserInfo,
      });
    };

    void fetchDeviceInfo();
  }, []);

  return deviceInfo;
};
