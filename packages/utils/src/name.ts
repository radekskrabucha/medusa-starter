type GetNameParams = {
  firstName?: string | null
  lastName?: string | null
}

export const getName = ({ firstName, lastName }: GetNameParams) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  }

  if (!firstName && !lastName) {
    return undefined
  }

  return firstName ?? lastName
}