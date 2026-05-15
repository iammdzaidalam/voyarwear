import { useAuth as useClerkAuth, useUser as useClerkUser, SignInButton as ClerkSignInButton, UserButton as ClerkUserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const isClerkConfigured =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('REPLACE_ME')
    : process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('REPLACE_ME');

export function useAuth() {
  if (!isClerkConfigured) {
    return { isSignedIn: false, isLoaded: true, userId: null };
  }
  try {
    return useClerkAuth();
  } catch {
    return { isSignedIn: false, isLoaded: true, userId: null };
  }
}

export function useUser() {
  if (!isClerkConfigured) {
    return { isSignedIn: false, isLoaded: true, user: null };
  }
  try {
    return useClerkUser();
  } catch {
    return { isSignedIn: false, isLoaded: true, user: null };
  }
}

export function SignInButton({ children, mode, forceRedirectUrl, ...props }) {
  if (!isClerkConfigured) {
    return <Link href="/sign-in">{children}</Link>;
  }
  return (
    <ClerkSignInButton mode={mode} forceRedirectUrl={forceRedirectUrl} {...props}>
      {children}
    </ClerkSignInButton>
  );
}

export function UserButton(props) {
  if (!isClerkConfigured) {
    return <Link href="/account">Account</Link>;
  }
  return <ClerkUserButton {...props} />;
}

