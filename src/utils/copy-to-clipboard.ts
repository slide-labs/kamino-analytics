// import toast from 'react-hot-toast'

export const copyToClipboard = (value: string | undefined) => {
  if (!value) return
  navigator.clipboard.writeText(value)
//   toast.success('Copied successfully!')
}
