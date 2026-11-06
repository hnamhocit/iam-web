import { NotFoundView } from "@/components/ui/not-found-view";

export default function NotFound() {
  return (
    <NotFoundView
      appName="VNTEZ ID"
      homeHref="/"
      docsHref="https://vntez.cloud/docs"
      consoleHref="https://console.vntez.cloud"
      idHref="/"
    />
  );
}
