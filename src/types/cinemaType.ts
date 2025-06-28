export interface IPosition {
  latitude: number
  longtitude: number
}

export interface ICinema {
  slug: string
  name: string
  description?: string
  coverImage: string
  images: string[]
  phoneNumber: string
  address: string
  position: IPosition
}

export type CreateCinemaType = Omit<ICinema, 'slug'>