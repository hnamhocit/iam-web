"use client";

import React, { useState } from "react";
import { AuthorizeEndpointCard } from "./endpoints/authorize-card";
import { TokenEndpointCard } from "./endpoints/token-card";
import { UserinfoEndpointCard } from "./endpoints/userinfo-card";
import { DiscoveryEndpointCard } from "./endpoints/discovery-card";

export function EndpointsSpecCards() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <AuthorizeEndpointCard copiedKey={copiedKey} onCopy={copy} />
      <TokenEndpointCard copiedKey={copiedKey} onCopy={copy} />
      <UserinfoEndpointCard copiedKey={copiedKey} onCopy={copy} />
      <DiscoveryEndpointCard copiedKey={copiedKey} onCopy={copy} />
    </div>
  );
}
