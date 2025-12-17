'use client'

import Link from 'next/link'
import { register } from '../actions/auth'
import { useActionState } from 'react'  

const initialState = {
  message: '',
  error: '',
}

export default function RegisterPage() {
    const [state, formAction] = useActionState(register, initialState)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg w-full space-y-4 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Create a New Account for Employee Portal</h2>
                </div>

                {state?.error && (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
                    {state.error}
                </div>
                )}

                <form className="mt-8 space-y-6" action={formAction}>
                    <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <input
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password (Min 6 karakter)"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Sign up
                    </button>
                    </div>
                </form>
                
                <div className="text-center">
                    <p className="mt-2 text-sm text-gray-600">
                    Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-500">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}