'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

// Custom Title Card
const PageTitle = ({ heading, text, path = "/", linkText }) => {
    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold">{heading}</h2>
            <div className="flex items-center gap-3">
                  {/* We use flex to align items in a row with some gap */}
                <p className="text-slate-600">{text}</p>
                {/* Also for the link to use flex to align the text and icon in a row (No need to add justify-content) */}
                <Link href={path} className="flex items-center gap-1 text-green-500 text-sm">
                    {linkText} <ArrowRightIcon size={14} />
                </Link>
            </div>
        </div>
    )
}

export default PageTitle