export default function ApiError(message: string, statusCode: number) {
  return {
    message,
    statusCode,
  };
}
