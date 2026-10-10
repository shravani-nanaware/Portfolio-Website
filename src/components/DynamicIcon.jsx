import * as Icons from 'lucide-react';

export default function DynamicIcon({ name, className = '', size = 20 }) {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    // Fallback icon if not found
    return <Icons.HelpCircle className={className} size={size} />;
  }
  return <IconComponent className={className} size={size} />;
}
