type ProfileDetailsTileProps = {
  icon: React.ReactNode
  title: React.ReactNode
  value: React.ReactNode | undefined
  placeholder?: React.ReactNode
}

export const ProfileDetailsTile: React.FC<ProfileDetailsTileProps> = ({
  icon,
  title,
  value,
  placeholder
}) => (
  <div className="text-muted-foreground flex flex-col gap-1">
    <div className="text-foreground flex items-center gap-2">
      {icon}
      <h3 className="text-sm font-semibold capitalize">{title}</h3>
    </div>
    {value ? <p>{value}</p> : <span>{placeholder}</span>}
  </div>
)
