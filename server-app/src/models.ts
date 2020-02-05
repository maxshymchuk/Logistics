export type CustomResponse = {
  status: {
    content: any,
    code: number,
  },
  isFound: boolean
}

export type Location = {
  name: string,
  coordinates: {
    north: number,
    east: number
  }
}