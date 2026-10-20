import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/cities";
import { Input } from "@/components/ui/input";

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
  disabled?: boolean;
}

export function CityPicker({ value, onChange, disabled }: CityPickerProps) {
  const [open, setOpen] = useState(false);
  const query = value.trim().toLowerCase();
  const suggestions = useMemo(() => {
    const matches = query.length >= 2
      ? CITIES.filter((city) => city.toLowerCase().includes(query))
      : CITIES;
    return matches.slice(0, 12);
  }, [query]);

  return (
    <div className="relative">
      <Input
        aria-label="Cidade"
        required
        minLength={2}
        maxLength={80}
        disabled={disabled}
        placeholder="Cidade (ex: Campinas, SP)"
        value={value}
        autoComplete="off"
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {open && suggestions.length > 0 && (
        <div className="glass absolute left-0 right-0 top-full z-10 mt-2 max-h-64 overflow-y-auto rounded-lg p-2" data-testid="city-suggestions">
          <p className="px-2 pb-1.5 text-xs text-muted-foreground">Sugestões de cidade — toque para escolher</p>
          {suggestions.map((city) => {
            const selected = city === value;
            return (
              <button
                key={city}
                type="button"
                disabled={disabled}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => { onChange(city); setOpen(false); }}
                aria-pressed={selected}
                className={`city-chip flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-display transition-colors hover:bg-secondary hover:text-secondary-foreground ${selected ? "city-chip-active" : ""}`}
              >
                <MapPin className="size-4 shrink-0" /> {city}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
