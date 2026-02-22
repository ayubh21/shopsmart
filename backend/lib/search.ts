import { PCOptimumAPI} from "../api/pcoptimum"

export const searchAllStores = async (query: string) => {
    const pcOptimum = new PCOptimumAPI()
    const pcPromise = pcOptimum.searchProducts(query)

    const responses = await Promise.allSettled([
        pcPromise
    ])

    const successfulResponses = responses.filter((r) => r.status === "fulfilled")
    const results = successfulResponses
        .flatMap((r) => r.value)
        .sort((a, b) => a.price - b.price)

    return results
}


