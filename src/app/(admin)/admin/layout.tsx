import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Home } from "lucide-react";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <section>
      {session && (
        <div className="bg-background sticky top-0 z-10 mx-auto flex max-w-7xl gap-4 p-4 sm:px-6 lg:px-8">
          <Link href={"/admin"} passHref>
            <Button className={"p-4"} variant="primary">
              <Home />
            </Button>
          </Link>
          <Link href={"/admin/project"} passHref>
            <Button className={"p-4"} variant="primary">
              New Project
            </Button>
          </Link>
          <Link href={"/admin/experience"} passHref>
            <Button className={"p-4"} variant="primary">
              New Experience
            </Button>
          </Link>
          <Link href={"/admin/skills"} passHref>
            <Button className={"p-4"} variant="primary">
              New Skills
            </Button>
          </Link>
          <Link href={"/admin/content"} passHref>
            <Button className={"p-4"} variant="primary">
              New Content
            </Button>
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="destructive" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      )}

      {children}
    </section>
  );
}
