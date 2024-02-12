type Props = {
  availableRewards: number
  assignedRewards: number
}

export default function CategoryListItemRewardsInfo({
  assignedRewards,
  availableRewards,
}: Readonly<Props>) {
  return (
    <div>
      <span className="text-[#BBFFBA]">{assignedRewards}</span>
      <span> / </span>
      <span className="text-[#D8B1FF]">{availableRewards}</span>
    </div>
  )
}
