import { NotFoundView } from "@/components/ui/not-found-view";

export default function NotFound() {
  return (
    <NotFoundView
      appName="VNTEZ IAM"
      homeHref="/"
      docsHref="https://vntez.vercel.app/docs"
      consoleHref="https://vntez-console.vercel.app"
      idHref="/"
    />
  );
}
