import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") || "";

  const apiKey = process.env.NEXT_PUBLIC_FREEPIK_API_KEY || "";
  const baseUrl = process.env.NEXT_PUBLIC_FREEPIK_API_BASE_URL || "";

  try {
    const response = await fetch(
      `${baseUrl}?term=${encodeURIComponent(term)}&limit=1&order=relevance`,
      {
        headers: {
          "x-freepik-api-key": apiKey,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Freepik" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
