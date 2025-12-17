'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'


export type ActionState = {
  message?: string
  error?: string
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        return { error: error.message }
    }
    redirect('/dashboard')
}

export async function register(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    })
    if (error) {
        return { error: error.message }
    }
    redirect('/login')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
