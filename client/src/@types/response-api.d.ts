export interface GoogleApiResponse {
  routes: Array<{
    duration: {
      value: string
    }
    distanceMeters: number
    legs: Array<{
      startLocation: {
        latLng: {
          latitude: number
          longitude: number
        }
      }
      endLocation: {
        latLng: {
          latitude: number
          longitude: number
        }
      }
    }>
  }>
}

interface IRideEstimateResponse {
  origin: {
    latitude: number
    longitude: number
  }
  destination: {
    latitude: number
    longitude: number
  }
  distance: number
  duration: string
  options: Array<{
    id: number
    name: string
    description: string
    vehicle: string
    review: {
      rating: number
      comment: string
    }
    value: number
  }>
  routeResponse: GoogleApiResponse
}

export interface IRidesResponse {
  customer_id: string
  rides: Array<{
    id: string
    date: Date
    origin: string
    destination: string
    distance: number
    duration: string
    driver: {
      id: number
      name: string
    }
    value: number
  }>
}
