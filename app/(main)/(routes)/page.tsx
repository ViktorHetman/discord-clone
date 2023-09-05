import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
