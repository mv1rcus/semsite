import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/cities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export function CityPicker({ value, onChange, disabled }: CityPickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const query = value.trim().toLowerCase();
  const suggestions = useMemo(() => {
    const matches = query.length >= 2
      ? CITIES.filter((city) => city.toLowerCase().includes(query))
      : CITIES;
    return matches.slice(0, 12);
  }, [query]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onBlur={(event) => {
        if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
    >
      <MapPin className="pointer-events-none absolute left-3 top-6 z-[1] size-5 -translate-y-1/2 text-primary" />
      <Input
        aria-label="Cidade"
        className="h-12 pl-10 text-base"
        required
        minLength={2}
        maxLength={80}
        disabled={disabled}
        placeholder="Cidade (ex: Holambra, SP)"
        value={value}
        autoComplete="off"
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && suggestions.length > 0 && (
        <div className="city-suggestions absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-y-auto rounded-lg p-2" data-testid="city-suggestions">
          <p className="px-2 pb-1.5 text-xs text-muted-foreground">Sugestões de cidade — toque para escolher</p>
          {suggestions.map((city) => {
            const selected = city === value;
            return (
              <Button
                key={city}
                type="button"
                variant="ghost"
                disabled={disabled}
                onClick={() => { onChange(city); setOpen(false); }}
                aria-pressed={selected}
                className={`city-chip flex w-full justify-start items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-display transition-colors hover:bg-secondary hover:text-secondary-foreground ${selected ? "city-chip-active" : ""}`}
              >
                <MapPin className="size-4 shrink-0" /> {city}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
