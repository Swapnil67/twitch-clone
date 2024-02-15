import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";

interface CreatorLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const CreatorLayout = async (props: CreatorLayoutProps) => {
  const { children, params } = props;
  const self = await getSelfByUsername(params.username);

  // TODO Create a proper error page
  if (!self) {
    redirect("/");
  }

  return (
    <>
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default CreatorLayout;
