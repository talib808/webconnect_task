import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  
  if (res.ok) {
    localStorage.setItem('token', data.token);
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 401 });
  }
}
