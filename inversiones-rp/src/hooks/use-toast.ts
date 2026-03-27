import * as React from "react"

const TOAST_LIMIT = 1

type ToasterToast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0
function genId() {// Generate unique IDs for internal React key mapping
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export function useToast() {
  const [state, setState] = React.useState<{ toasts: ToasterToast[] }>({ toasts: [] })

  const toast = ({ ...props }: Omit<ToasterToast, "id">) => {
    const id = genId()
    setState((state) => ({// Update state while enforcing a maximum visible toast limit
      ...state,
      toasts: [{ ...props, id }, ...state.toasts].slice(0, TOAST_LIMIT),
    }))
  }

  return {
    toast,
    toasts: state.toasts,
  }
}