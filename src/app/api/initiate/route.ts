import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, complaint, budget, locale } = body

    // Validate required fields
    if (!name || !complaint || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Build structured payload
    const payload = {
      timestamp: new Date().toISOString(),
      locale,
      client: { name, company: company || '-' },
      complaint,
      budget,
    }

    // TODO: Replace with actual webhook URL or email service
    // Example: await fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })
    console.log('[WEATSO] New project initiation:', JSON.stringify(payload, null, 2))

    // Async fire-and-forget to PA webhook (non-blocking)
    // This runs server-side only — client never sees the webhook URL
    const webhookUrl = process.env.PA_WEBHOOK_URL
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => console.error('[WEATSO] Webhook delivery failed:', err))
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
