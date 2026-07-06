import { FOOTER } from "@/lib/content";
import { InstagramIcon, YoutubeIcon, FacebookIcon, TiktokIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  Facebook: FacebookIcon,
  Tiktok: TiktokIcon,
} as const;

/**
 * Static footer with a giant gradient-filled wordmark and a three-column
 * bottom bar (studio links / nav links / social icons).
 */
export function Footer() {
  return (
    <footer className="footer overflow-hidden bg-page pt-16 pb-10">
      <p
        className="font-script mb-8 select-none whitespace-nowrap text-center leading-[1.1] tracking-normal text-transparent"
        style={{
          fontSize: "clamp(4.5rem, 18vw, 260px)",
          background: "linear-gradient(0deg, #de7ba6, #e9d7b8 55%, #fff7fa 96%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {FOOTER.wordmark}
      </p>

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <nav className="flex flex-wrap justify-center gap-6 md:order-2">
          {FOOTER.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-[18px] font-semibold transition-colors hover:text-brand",
                link.label === "Inicio" ? "text-brand" : "text-ink"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-3 md:order-3">
          {FOOTER.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS];
            return (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b5638] text-white transition-colors hover:bg-brand"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
