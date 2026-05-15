'use client';

import { ClerkProvider } from '@clerk/nextjs';

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = publishableKey && !publishableKey.includes('REPLACE_ME');

export default function AuthProvider({ children }) {
  if (!isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      appearance={{
        variables: {
          colorPrimary: '#18181b',
          fontFamily: 'var(--font-poppins), system-ui, sans-serif',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
