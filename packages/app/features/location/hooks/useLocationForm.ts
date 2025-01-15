"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@homefront/app/utils/trpc";

import type { HexWithPopulation } from "../types";

export function useLocationForm(
  hexes: HexWithPopulation[],
  recommendedHex?: HexWithPopulation,
) {
  const [hexesToSearch, setHexesToSearch] =
    useState<HexWithPopulation[]>(hexes);

  const addUserLocation = api.userLocations.addUserLocation.useMutation();

  const formSchema = z.object({
    hex: z.string().refine((hex) => hexesToSearch.some((h) => h.hex === hex), {
      message: "Invalid H3 cell index",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hex: recommendedHex?.hex ?? "",
    },
  });

  const { isValid } = form.formState;

  const handleSaveLocation = async (data: z.infer<typeof formSchema>) => {
    const { hex } = data;

    await addUserLocation.mutateAsync({
      hex,
    });
  };

  const hexValue = form.watch("hex");
  const selectedHex = hexesToSearch.find(({ hex }) => hex === hexValue);

  useEffect(() => {
    setHexesToSearch(hexes);
  }, [hexes]);

  useEffect(() => {
    form.setValue("hex", recommendedHex?.hex ?? "");
  }, [recommendedHex]);

  useEffect(() => {
    async function revalidate() {
      await form.trigger("hex");
    }
    void revalidate();
  }, [hexValue, hexesToSearch]);

  return { form, isValid, handleSaveLocation, selectedHex, formSchema };
}
