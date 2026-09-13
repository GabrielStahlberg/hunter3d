type QuantityStepperProps = {
  quantity: number;
  onChange: (quantity: number) => void;
  label: string;
};

export function QuantityStepper({ quantity, onChange, label }: QuantityStepperProps) {
  return (
    <div className="flex h-11 items-center rounded border border-border">
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={`Diminuir quantidade — ${label}`}
        className="flex h-full w-10 items-center justify-center text-lg text-foreground hover:text-primary"
      >
        −
      </button>
      <span className="flex h-full w-10 items-center justify-center text-sm font-medium text-foreground" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label={`Aumentar quantidade — ${label}`}
        className="flex h-full w-10 items-center justify-center text-lg text-foreground hover:text-primary"
      >
        +
      </button>
    </div>
  );
}
