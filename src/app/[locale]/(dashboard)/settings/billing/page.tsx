"use client";

import { CurrentPlanCard } from "./components/current-plan-card";
import { BillingHistoryCard } from "./components/billing-history-card";

// Import data
import currentPlanData from "./data/current-plan.json";
import billingHistoryData from "./data/billing-history.json";

export default function BillingSettings() {
  return (
    <div className="space-y-6 px-4 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold">Plans & Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing information.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <CurrentPlanCard plan={currentPlanData} />
        <BillingHistoryCard history={billingHistoryData} />
      </div>
    </div>
  );
}
