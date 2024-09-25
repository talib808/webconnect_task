import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, email, password } = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 400 });
  }
}
