import {
  Monitor, CakeSlice, Sprout, TreePine, Flower2, Coffee, SprayCan,
  Building2, Droplets, UtensilsCrossed, GraduationCap, MessageCircle, Zap,
  type LucideIcon
} from "lucide-react";

export const materialIconMap: Record<string, LucideIcon> = {
  desktop_windows: Monitor,
  bakery_dining: CakeSlice,
  agriculture: Sprout,
  potted_plant: Sprout,
  nature: TreePine,
  nature_people: Flower2,
  local_cafe: Coffee,
  cleaning_services: SprayCan,
  hotel: Building2,
  water: Droplets,
  set_meal: UtensilsCrossed,
  school: GraduationCap,
  computer: Monitor,
  forum: MessageCircle,
  bolt: Zap,
};
