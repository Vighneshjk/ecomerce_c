import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const useProducts = () => {
    const searchParams = useSearchParams()

    // Create query string from searchParams
    const queryParams = searchParams.toString()

    return useQuery({
        queryKey: ['products', queryParams],
        queryFn: async () => {
            const res = await fetch(`/api/products?${queryParams}`)
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        },
    })
}
