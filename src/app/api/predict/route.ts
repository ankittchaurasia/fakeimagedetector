import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

const PREDICTION_API_URL = process.env.PREDICTION_API_URL!;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const token = formData.get("cf-turnstile-response") as string;
    const imageFile = formData.get("file") as File;

    if (!imageFile) return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    if (!token) return NextResponse.json({ error: "Security token required" }, { status: 400 });

    const validationResponse = await verifyTurnstile(token);    
    console.log("verification response:", validationResponse);
    if (!validationResponse.success) return NextResponse.json({ error: "Security verification failed" }, { status: 403 });

    // Forward the image to the prediction API
    const predictionFormData = new FormData();
    predictionFormData.append("file", imageFile);

    const predictionResponse = await fetch(PREDICTION_API_URL, {
      method: "POST",
      body: predictionFormData,
    });

    if (!predictionResponse.ok) {
      return NextResponse.json(
        { error: "Prediction service error" },
        { status: 500 }
      );
    }

    // Get prediction results from headers
    const isFake = predictionResponse.headers.get("x-is-fake");
    const confidence = predictionResponse.headers.get("x-confidence");

    // Get the ELA image
    const elaImageBuffer = await predictionResponse.arrayBuffer();
    const elaImageBase64 = Buffer.from(elaImageBuffer).toString("base64");
    const elaImageDataUrl = `data:image/jpeg;base64,${elaImageBase64}`;

    // Return results
    return NextResponse.json({
      success: true,
      isFake: isFake === 'False' ? false : true,
      confidence: confidence,
      elaImageUrl: elaImageDataUrl,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


async function verifyTurnstile(token: string) {
  const idempotencyKey = v4();
  
  // Create form data for Cloudflare verification
  const verifyFormData = new URLSearchParams();
  verifyFormData.append('secret', process.env.TURNSTILE_SECRET_KEY!);
  verifyFormData.append('response', token);
  verifyFormData.append('idempotency_key', idempotencyKey);
  
  // Call Cloudflare's verification API
  const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: verifyFormData
  });
  
  return await verifyResponse.json();
}
