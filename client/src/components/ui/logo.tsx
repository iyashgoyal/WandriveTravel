import { Plane } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Plane className="h-6 w-6 text-primary rotate-45" />
      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
        Wandrivo
      </span>
    </div>
  );
}
