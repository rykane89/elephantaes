// Netlify's reserved event function: runs automatically after every VERIFIED
// form submission (spam never reaches this). Copies the submission into
// Sanity so it shows up in the admin panel at elephantaes.com/admin.
//
// Requires SANITY_WRITE_TOKEN in Netlify environment variables (secret).

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "yxd68kno";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

export async function handler(event) {
  try {
    if (!token) {
      console.warn("SANITY_WRITE_TOKEN not set; submission not copied to Sanity.");
      return { statusCode: 200, body: "skipped" };
    }

    const { payload } = JSON.parse(event.body || "{}");
    const data = payload?.data || {};
    const formName = payload?.form_name;
    const submittedAt = payload?.created_at || new Date().toISOString();

    let mutation = null;

    if (formName === "newsletter") {
      const email = (data.email || "").trim().toLowerCase();
      if (!email) return { statusCode: 200, body: "no email" };
      // Deterministic id = same address can't create duplicates.
      const id = "subscriber-" + email.replace(/[^a-z0-9]+/g, "-");
      mutation = {
        createIfNotExists: {
          _id: id,
          _type: "subscriber",
          email,
          submittedAt,
        },
      };
    } else if (formName === "inquiry") {
      mutation = {
        create: {
          _type: "cakeEnquiry",
          name: data.name || "",
          email: data.email || "",
          occasion: data.occasion || "",
          eventDate: data.date || "",
          servings: data.servings || "",
          message: data.message || "",
          submittedAt,
        },
      };
    }

    if (!mutation) return { statusCode: 200, body: "ignored form" };

    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mutations: [mutation] }),
      }
    );

    if (!res.ok) {
      console.error("Sanity mutate failed:", res.status, await res.text());
    }
    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("submission-created error:", err);
    // Always 200 — never make Netlify retry-spam or mark the submission failed.
    return { statusCode: 200, body: "error logged" };
  }
}
