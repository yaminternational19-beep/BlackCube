import { NextRequest, NextResponse } from 'next/server';
import { isValidSection, readSection, writeSection } from '@/lib/cms';

function checkAuth(req: NextRequest): boolean {
  const header = req.headers.get('authorization');
  const token = process.env.CMS_TOKEN;
  if (!token) return true; // if not set, allow local edits
  if (!header) return false;
  const input = header.replace(/^Bearer\s+/i, '');
  return input === token;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }
  const data = await readSection(section);
  return NextResponse.json({ data });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { section } = await params;
  if (!isValidSection(section)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }
  const body = await req.json();
  await writeSection(section, body);
  return NextResponse.json({ ok: true });
}


