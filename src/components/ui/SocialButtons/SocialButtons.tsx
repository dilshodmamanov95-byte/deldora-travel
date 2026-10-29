'use client';

import { SOCIAL_LINKS } from '@/components/layout/Header/constants';
import { MessageCircle, Phone } from 'lucide-react';

interface SocialButtonsProps {
  className?: string;
}

// SVG иконки для социальных сетей
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9c2.5 0 4.87.9 6.84 2.5L14.5 9.5l1.41-1.41-2.82-2.83-2.83 2.83L8 13.34l2.83 2.83L8 18.97l-1.41-1.41L14.5 12.5l-1.42-1.42-2.82 2.82" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12L11 5l-7 7 7 7 10-7z" />
    <path d="M11 5l7 7-7 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function SocialButtons({ className = '' }: SocialButtonsProps) {
  const buttons = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: SOCIAL_LINKS.whatsapp,
      bgColor: 'bg-green-500',
      hoverColor: 'bg-green-600',
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon />,
      href: SOCIAL_LINKS.telegram,
      bgColor: 'bg-blue-500',
      hoverColor: 'bg-blue-600',
    },
    {
      name: 'Call',
      icon: <PhoneIcon />,
      href: SOCIAL_LINKS.phone,
      bgColor: 'bg-rose-500',
      hoverColor: 'bg-rose-600',
    },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {buttons.map((button) => (
        <a
          key={button.name}
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${button.bgColor} ${button.hoverColor} p-2.5 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg text-white`}
          aria-label={button.name}
          title={button.name}
        >
          {button.icon}
        </a>
      ))}
    </div>
  );
}
