import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '../actions/auth'


export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }
  // Fetch data announcements
  const { data: notes } = await supabase.from('announcements').select()

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1>Logged in as {user.email}</h1>
        <form action={signOut}><button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button></form>
      </div>
      <div className="py-8">
        <h1 className='my-4'>Welcome, {user.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes?.map((note) => (
            <div key={note.id} className="border rounded overflow-hidden shadow hover:shadow-lg transition">
              <div className="p-4">
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p className="text-gray-500 text-sm">{note.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}