import { NextResponse } from 'next/server';

export async function POST(req) {
  const { content } = await req.json();
  const token = req.headers.get('Authorization');

  const res = await fetch(`${process.env.BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': token 
    },
    body: JSON.stringify({ content }),
  });

  const data = await res.json();
  
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 400 });
  }
}

export async function GET(req) {
  const res = await fetch(`${process.env.BACKEND_URL}/posts`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  
  if (res.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(data, { status: 400 });
  }
}
