import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { auth, signOut } from "@/auth";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <section>
      {session && (
        <div className="sticky top-0 mx-auto flex max-w-7xl gap-4 p-4 sm:px-6 lg:px-8">
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
