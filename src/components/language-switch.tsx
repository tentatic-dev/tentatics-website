import { Link, usePathname } from "@/i18n/navigation"; // Assuming createNavigation is used in i18n/routing.ts

export default function LanguageSwitcher() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-2">
      <Link href={pathname} locale="en">
        EN
      </Link>
      <Link href={pathname} locale="id">
        ID
      </Link>
    </div>
  );
}
