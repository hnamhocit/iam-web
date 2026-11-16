"use client";

import React from "react";
import { LandingCodeSandbox } from "./landing/landing-code-sandbox";
import { LandingCtaFooter } from "./landing/landing-cta-footer";
import { LandingEndpoints } from "./landing/landing-endpoints";
import { LandingFeatures } from "./landing/landing-features";
import { LandingHeader } from "./landing/landing-header";
import { LandingHero } from "./landing/landing-hero";

export { MASTER_AI_INTEGRATION_PROMPT } from "./landing/code-examples-data";

export interface LandingUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

interface LandingPageProps {
  user?: LandingUser | null;
}

export function LandingPage({ user }: LandingPageProps = {}) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-[#fb291a]/20 selection:text-[#fb291a]">
      <LandingHeader user={user} />
      <LandingHero />
      <LandingFeatures />
      <LandingCodeSandbox />
      <LandingEndpoints />
      <LandingCtaFooter />
    </div>
  );
}
