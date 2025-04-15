import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-10', className)}
            viewBox="0 0 32 32" // Updated viewBox from the provided SVG
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            {/* New path from the provided SVG */}
            <path d="M26 17l-3 3-3-3-3 3-3-3-3 3-6-6 3-3 3 3 3-3 3 3 3-3 6 6z"></path>
        </svg>
    )
}

