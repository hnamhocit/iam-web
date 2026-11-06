"use client";

import { ErrorBoundaryView } from "@/components/ui/error-boundary-view";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorBoundaryView
      error={error}
      reset={reset}
      appName="VNTEZ ID"
      homeHref="/"
    />
  );
}
