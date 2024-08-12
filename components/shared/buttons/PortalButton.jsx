import { useRouter } from "next/navigation";

export default function PortalButton({ user, token, children }) {
  const router = useRouter();

  const handleSubscriptionClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/stripe/customer-portal`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push(data.url);
      } else {
        console.error("Failed to create customer portal session");
      }
    } catch (error) {
      console.error("Error creating customer portal session", error);
    }
  };

  const onClickHandler = async () => {
    if (user?.plan === "free") {
      router.push("/dashboard/plans");
    } else {
      await handleSubscriptionClick();
    }
  };

  return (
    <button onClick={onClickHandler} className="block w-full">
      {children}
    </button>
  );
}
