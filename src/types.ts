export type Order = {
  id: number
  description: string
  icons: { large: string; medium: string }
  level: number
  nation: { icons: { small: string } }
  title: string
  type: { name: string; title: string }
}

export type Response = Order[]
