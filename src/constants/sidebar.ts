import * as LucideIcons from 'lucide-react';
import { ROUTES } from '@constants/routes';

export const sideBarItems: {
  name: string;
  icon: keyof typeof LucideIcons;
  link: string;
}[] = [
  {
    name: '거래내역',
    icon: 'FileText',
    link: ROUTES.TRANSACTIONS,
  },
  {
    name: '키 관리',
    icon: 'KeyRound',
    link: ROUTES.KEY_MANAGEMENT,
  },
];
