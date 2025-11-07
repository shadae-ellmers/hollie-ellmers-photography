import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { token } = await req.json()

  if (!token) {
    return NextResponse.json(
      { message: 'Missing reCAPTCHA token' },
      { status: 400 }
    )
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

  const params = new URLSearchParams()
  params.append('secret', secret!)
  params.append('response', token)

  const response = await fetch(verifyUrl, {
    method: 'POST',
    body: params,
  })

  const data = await response.json()

  if (!data.success || data.score < 0.5) {
    return NextResponse.json(
      { message: 'reCAPTCHA verification failed' },
      { status: 403 }
    )
  }

  return NextResponse.json({ message: 'Success' })
}
