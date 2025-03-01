import { Button } from '@medusa-starter/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { actions } from '~web/lib/medusa'

export const SignUpForm = () => {
  const signUpMutation = useMutation({
    mutationFn: actions.auth.signUpWithEmail,
    mutationKey: ['signUpWithEmail']
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className="layout-section">
      <h3>Sign Up Form</h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()

          signUpMutation.mutate({
            email,
            password
          })
        }}
        noValidate
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border-foreground rounded-md border-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border-foreground rounded-md border-2"
        />
        <Button
          disabled={signUpMutation.isPending}
          type="submit"
        >
          Sign Up
        </Button>
        {signUpMutation.error?.message && (
          <pre className="text-red-500">{signUpMutation.error.message}</pre>
        )}
        {signUpMutation.status === 'success' && (
          <pre className="text-green-500">Successfully signed up!</pre>
        )}
      </form>
    </section>
  )
}
