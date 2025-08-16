import { NextResponse } from 'next/server'
import { list, type ListBlobResult } from '@vercel/blob'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get('cursor') ?? undefined
  const prefix = searchParams.get('prefix') ?? 'images/'
  const limit = Number(searchParams.get('limit') ?? 24)

  const result: ListBlobResult = await list({ cursor, prefix, limit })
  return NextResponse.json(result)
}
