"use client";

import React from "react";
import { LandingHeader } from "./landing/landing-header";
import { LandingHero } from "./landing/landing-hero";
import { LandingFeatures } from "./landing/landing-features";
import { LandingCodeSandbox } from "./landing/landing-code-sandbox";
import { LandingEndpoints } from "./landing/landing-endpoints";
import { LandingCtaFooter } from "./landing/landing-cta-footer";

export { MASTER_AI_INTEGRATION_PROMPT } from "./landing/code-examples-data";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-[#fb291a]/20 selection:text-[#fb291a]">
      <LandingHeader />
      <LandingHero />
      <LandingFeatures />
      <LandingCodeSandbox />
      <LandingEndpoints />
      <LandingCtaFooter />
    </div>
  );
}
