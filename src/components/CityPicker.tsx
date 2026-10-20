import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/cities";
import { Button } from "@/components/ui/button";

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export function CityPicker({ value, onChange, disabled }: CityPickerProps) {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = scroller.current?.querySelector<HTMLElement>('[data-selected="true"]');
    selected?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [value]);

  return (
    <div className="glass rounded-lg p-2">
      <div ref={scroller} className="city-scroller flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-1">
        {CITIES.map((city) => {
          const selected = city === value;
          return (
            <Button
              key={city}
              type="button"
              data-selected={selected}
              disabled={disabled}
              variant={selected ? "secondary" : "outline"}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => onChange(city)}
              aria-pressed={selected}
              className={`city-chip shrink-0 snap-center font-display ${selected ? "city-chip-active" : ""}`}
            >
              <MapPin className="size-4 shrink-0" /> {city}
            </Button>
          );
        })}
      </div>
      <p className="px-2 pt-1.5 text-xs text-muted-foreground">Arraste para o lado e toque na cidade que quiser.</p>
    </div>
  );
}
