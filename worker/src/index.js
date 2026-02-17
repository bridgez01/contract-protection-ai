export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      // Log that we received a request
      console.log("📥 Received request");
      
      // Parse the request body
      let body;
      try {
        body = await request.json();
        console.log("📦 Request body:", body);
      } catch (e) {
        console.log("❌ Failed to parse JSON:", e.message);
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      const { contract } = body;
      
      if (!contract || !contract.trim()) {
        console.log("❌ No contract text provided");
        return new Response(JSON.stringify({ error: "Contract text required" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      console.log("📄 Contract length:", contract.length, "characters");

      // Check if AI binding exists
      if (!env.AI) {
        console.log("❌ AI binding not found!");
        return new Response(JSON.stringify({ error: "AI binding not configured" }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      console.log("🤖 Calling Llama...");

      // Call Llama
      const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          {
				role: "system",
				content: `You are a JSON-only contract analyzer. 
				CRITICAL: You MUST respond with ONLY valid JSON. No explanations, no extra text.
				
				The JSON MUST have exactly:
				{
				"summary": "one sentence summary",
				"redFlags": ["flag 1", "flag 2", "flag 3"],
				"verdict": "SIGN / NEGOTIATE / RUN with brief reason"
				}`
			},

          {
            role: "user",
            content: `Analyze this contract:\n\n${contract}`
          }
        ],
        response_format: { type: "json_object" }
      });

      console.log("✅ AI response received");

      // Parse response
      let analysis;
      try {
        analysis = JSON.parse(response.response);
        console.log("✅ Parsed JSON successfully");
      } catch (e) {
        console.log("❌ Failed to parse AI response as JSON:", e.message);
        console.log("Raw response:", response.response);
        analysis = {
          summary: "AI response wasn't valid JSON",
          redFlags: ["The AI returned an unexpected format. Try a simpler contract."],
          verdict: "⚠️ Try again with shorter text"
        };
      }

      return new Response(JSON.stringify(analysis), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });

    } catch (error) {
      console.log("💥 Uncaught error:", error.message);
      console.log("Stack trace:", error.stack);
      
      return new Response(JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
  }
};