"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

export const Progress = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [newPathname, setNewPathname] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      setNewPathname(pathname);
      NProgress.start();
      setIsLoading(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      if (newPathname === pathname) {
        NProgress.done();
        setIsLoading(false);
      }
    }
  }, [newPathname, isLoading, pathname]);

  return null;
};
