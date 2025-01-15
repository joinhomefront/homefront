interface DebouncedCancelableFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any[]) => Promise<any>,
> {
  (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>>;
  cancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cancelableDebounce<T extends (...args: any[]) => Promise<any>>(
  func: (
    signal: AbortSignal,
    ...args: Parameters<T>
  ) => Promise<Awaited<ReturnType<T>>>,
  wait: number,
): DebouncedCancelableFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let abortController: AbortController | null = null;

  const debouncedFunction = (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> => {
    if (timeout) clearTimeout(timeout);
    if (abortController)
      abortController.abort("Debounced function called again");

    abortController = new AbortController();

    return new Promise<Awaited<ReturnType<T>>>((resolve, reject) => {
      timeout = setTimeout(() => {
        void (async () => {
          try {
            if (!abortController) return;
            const result = await func(abortController.signal, ...args);
            resolve(result);
          } catch (error) {
            if (abortController?.signal.aborted) {
              console.log("Debounced function aborted.");
            } else {
              reject(error instanceof Error ? error : new Error(String(error)));
            }
          } finally {
            timeout = null;
            abortController = null;
          }
        })();
      }, wait);
    });
  };

  // Attach a cancel method to the function
  (debouncedFunction as DebouncedCancelableFunction<T>).cancel = () => {
    if (timeout) clearTimeout(timeout);
    if (abortController) abortController.abort("Debounced function canceled.");
    timeout = null;
    abortController = null;
  };

  return debouncedFunction as DebouncedCancelableFunction<T>;
}

export { getBaseUrl } from "./base-url";
