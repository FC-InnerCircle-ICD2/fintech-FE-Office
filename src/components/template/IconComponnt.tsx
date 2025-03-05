import * as LucideIcons from 'lucide-react';

const IconComponnt = ({ icon }: { icon: keyof typeof LucideIcons }) => {
  const LucideIcon = LucideIcons[icon] as LucideIcons.LucideIcon;
  return <LucideIcon />;
};

export default IconComponnt;
