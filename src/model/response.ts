import { Property } from './properties'

export type Response = {
    current_payment: number
    high: number
    low: number
    med: number
    tag: string
    paragraph: string
    locations: Property[]
}
