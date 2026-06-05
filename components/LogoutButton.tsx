'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton(){
return(
    <button 
     onClick={()=>signOut({callbackUrl: '/'})}
     className="text-xs px-3 py-1.5 rounded-xl transition-all hover:bg-white/10"
      style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
    Logout
    </button>
)
}