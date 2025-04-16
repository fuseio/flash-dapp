import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

const CopyToClipboard = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(text)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  return (
    <Button variant="ghost" size="icon" onClick={handleCopy}>
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </Button>
  )
}

export default CopyToClipboard
