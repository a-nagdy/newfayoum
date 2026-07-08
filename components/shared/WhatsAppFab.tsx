import { MessageCircle } from "lucide-react";

interface WhatsAppFabProps {
  href: string;
  label: string;
}

export function WhatsAppFab({ href, label }: WhatsAppFabProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
