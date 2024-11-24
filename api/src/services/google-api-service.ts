import axios from 'axios'

interface GoogleApiResponse {
  // Tipagem baseada na resposta que a API retorna
  data: any
}

export class GoogleApiService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api'
  private readonly apiKey = 'GOOGLE_API_KEY'

  async getDirections(
    origin: string,
    destination: string,
  ): Promise<GoogleApiResponse> {
    const url = `${this.baseUrl}/directions/json`
    const params = {
      origin,
      destination,
      key: this.apiKey,
    }

    try {
      const response = await axios.get<GoogleApiResponse>(url, { params })
      return response.data
    } catch (error) {
      console.error('Error fetching directions from Google API:', error)
      throw new Error('Failed to fetch directions')
    }
  }
}
