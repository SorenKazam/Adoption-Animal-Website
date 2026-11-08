"use client";

import { useState } from "react";
import { ApplicationProps } from "@/types/application";
import styles from "./ApplicationDetails.module.scss";
import { acceptApplication } from "@/actions/admin/applications/accept";
import { declineApplication } from "@/actions/admin/applications/decline";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "done";

export default function ApplicationActions({
  application,
  acceptText,
  rejectText,
}: {
  application: ApplicationProps;
  acceptText: string;
  rejectText: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  async function handleAction(action: "accept" | "reject") {
    const confirmed = confirm(
      `Are you sure you want to ${action} this application?`,
    );

    if (!confirmed) return;

    setStatus("loading");

    // Check if application has already been processed
    if (application.animals.adoption_status !== "pending") {
      toast.error("This adoption request has already been processed.");
      setStatus("done");
      return;
    }

    const actionResult =
      action === "accept"
        ? await acceptApplication(application.id)
        : await declineApplication(application.id);

    if (!actionResult.success) {
      toast.error(actionResult.message);
      setStatus("idle");
      return;
    }

    toast.success(actionResult.message);
    setStatus("done");

    if (action === "reject") {
      router.push("/admin/applications");
      router.refresh();
      return;
    }
  }

  if (status === "done" || application.animals.adoption_status !== "pending") {
    return (
      <div className={styles.actions}>
        This adoption request has already been processed.
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <button
        className={styles.reject}
        onClick={() => handleAction("reject")}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Rejecting..." : rejectText}
      </button>

      <button
        className={styles.accept}
        onClick={() => handleAction("accept")}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Accepting..." : acceptText}
      </button>
    </div>
  );
}
