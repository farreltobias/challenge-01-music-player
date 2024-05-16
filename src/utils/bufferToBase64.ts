export const bufferToBase64 = async (buffer: ArrayBuffer) => {
  const base64url = (await new Promise<string | ArrayBuffer | null>(
    (resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.readAsDataURL(new Blob([buffer]))
    }
  )) as string

  return base64url.slice(base64url.indexOf(',') + 1)
}
