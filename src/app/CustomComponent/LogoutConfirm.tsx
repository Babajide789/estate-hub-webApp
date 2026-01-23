"use client"

import { useRouter } from "next/navigation"
import { signOut } from "@/lib/supabase/auth"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface LogoutConfirmProps {
  trigger: React.ReactNode
  onAfterLogout?: () => void
}

export function LogoutConfirm({ trigger, onAfterLogout }: LogoutConfirmProps) {
  const router = useRouter()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to sign out?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your profile and saved
            properties.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={async () => {
              await signOut()
              onAfterLogout?.()
              router.push("/signin")
            }}
          >
            Yes, sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
