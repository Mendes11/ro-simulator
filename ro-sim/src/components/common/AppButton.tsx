import { Priority } from "@/contants"

type Props = {
  text: string
  priority: Priority
  full?: boolean
  onClick: () => void
}

export default function AppButton({text, priority, full, onClick}: Props) {
  return (
    <button 
      className={`border rounded-lg ${full && "w-full"} p-1 ${priority}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}