import { cn } from 'src/utilities/cn'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-12 rounded px-8 text-base', // Larger touch target (48px min)
        sm: 'h-9 rounded px-3',
      },
      variant: {
        // Allay Brand Variants - Enhanced with modern interactions
        primary: 'bg-warmGold text-deepNavy hover:bg-warmGoldHover focus-visible:ring-warmGold shadow-md font-semibold hover:shadow-glow-gold hover:scale-[1.08] active:scale-95',
        secondary: 'bg-skyBlue text-white hover:bg-skyBlue/90 focus-visible:ring-skyBlue shadow-md font-semibold hover:shadow-lg hover:scale-[1.05] active:scale-95',
        outline: 'border-2 border-skyBlue text-skyBlue bg-transparent hover:bg-skyBlue hover:text-white focus-visible:ring-skyBlue font-semibold hover:scale-[1.03] active:scale-95',

        // Default Shadcn Variants (for admin compatibility)
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    // Add shine effect for primary and secondary variants only (not for asChild)
    const hasShineEffect = !asChild && (variant === 'primary' || variant === 'secondary')

    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
          {children}
        </Comp>
      )
    }

    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props}>
        {hasShineEffect && (
          <span className="absolute inset-0 -z-10">
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </span>
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
