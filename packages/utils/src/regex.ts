export const phoneNumberRegex =
  /^(?:\+\d{1,3}[-.\s]?)?(?:\([0-9]{3}\)|[0-9]{3})[-.\s]?([0-9]{3})[-.\s]?([0-9]{3,4})$/

export const isPhoneNumber = (value: string) => phoneNumberRegex.test(value)
