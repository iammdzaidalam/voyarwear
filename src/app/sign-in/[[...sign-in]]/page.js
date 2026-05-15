import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Sign In | VoyarWear',
  description: 'Sign in to your VoyarWear account.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 pt-20">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-none border border-zinc-200 bg-white rounded-none',
            headerTitle: 'font-serif text-zinc-900 tracking-tight',
            headerSubtitle: 'text-zinc-400 text-sm font-light',
            formButtonPrimary:
              'bg-zinc-900 hover:bg-zinc-800 text-xs tracking-[0.15em] uppercase font-medium rounded-none h-12 transition-colors duration-300',
            formFieldInput:
              'rounded-none border-zinc-200 focus:border-zinc-900 focus:ring-0 text-sm',
            footerActionLink: 'text-zinc-600 hover:text-zinc-900',
            socialButtonsBlockButton:
              'rounded-none border-zinc-200 hover:bg-zinc-50 text-sm',
            dividerLine: 'bg-zinc-200',
            dividerText: 'text-zinc-300 text-xs uppercase tracking-wider',
          },
        }}
      />
    </div>
  );
}
