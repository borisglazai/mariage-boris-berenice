"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function seDeconnecter() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={seDeconnecter}
      style={{
        background: "transparent",
        border: "1.5px solid #201e1d",
        color: "#201e1d",
        padding: "9px 18px",
        borderRadius: 999,
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
      }}
    >
      Se déconnecter
    </button>
  );
}
