'use client';

import { UserProfile } from '@clerk/nextjs';

export default function AccountPage() {
  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-6">Profile</h2>
      <UserProfile
        routing="hash"
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none border border-zinc-200 rounded-none w-full',
            navbar: 'hidden',
            pageScrollBox: 'p-0',
            formButtonPrimary:
              'bg-zinc-900 hover:bg-zinc-800 text-xs tracking-[0.15em] uppercase font-medium rounded-none h-10 transition-colors',
            formFieldInput:
              'rounded-none border-zinc-200 focus:border-zinc-900 focus:ring-0 text-sm',
          },
        }}
      />
    </div>
  );
}
