import type { LucideIcon } from 'lucide-react'

type AddressDetailItemProps = {
  icon: LucideIcon
  label: string
  value?: string | null
}

export const AddressDetailItem = ({
  icon: Icon,
  label,
  value
}: AddressDetailItemProps) => (
  <div className="text-muted-foreground flex flex-1 items-center gap-3">
    <Icon className="size-4" />
    <div>
      <p className="text-sm">{label}</p>
      {value && <p className="text-foreground font-semibold">{value}</p>}
    </div>
  </div>
)
