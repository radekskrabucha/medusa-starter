export const phoneNumberRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})?$/

export const isPhoneNumber = (value: string) => phoneNumberRegex.test(value)
