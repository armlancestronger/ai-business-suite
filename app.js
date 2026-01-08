// ---------------------------------------------
// CONFIG — your live backend URL
// ---------------------------------------------
const API_BASE = "https://ai-business-suite-production.up.railway.app";

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  wireTrialForm();
  wireSupportForm();
  wireLeadForm();
  wireCampaignForm();
  loadAnalytics();
});

// ---------------------------------------------
// NAVIGATION
// ---------------------------------------------
function wireNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const views = document.querySelectorAll(".view");
  const titleEl = document.getElementById("view-title");
  const subtitleEl = document.getElementById("view-subtitle");

  const viewMeta = {
    trial: {
      title: "Trials",
      subtitle: "Capture and route trial requests into your pipeline."
    },
    support: {
      title: "Support Automation",
      subtitle: "Capture and route support messages."
    },
    leads: {
      title: "Lead Intake",
      subtitle: "Capture and qualify new leads."
    },
    campaigns: {
      title: "Email Campaigns",
      subtitle: "Send outbound campaigns via Resend."
    },
    analytics: {
      title: "Analytics",
      subtitle: "View recent activity and events."
    }
  };

  navItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-view");

      navItems.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      views.forEach((v) => v.classList.remove("active"));
      document.getElementById(`view-${target}`).classList.add("active");

      titleEl.textContent = viewMeta[target].title;
      subtitleEl.textContent = viewMeta[target].subtitle;

      if (target === "analytics") loadAnalytics();
    });
  });
}

// ---------------------------------------------
// TRIAL REQUEST FORM
// ---------------------------------------------
function wireTrialForm() {
  const form = document.getElementById("trial-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("status");

    const payload = {
      email: form.email.value,
      company: form.company.value,
      team_size: form.team_size.value
    };

    const res = await fetch(`${API_BASE}/trial-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    status.textContent = data.message || data.error;
    status.className = `status ${res.ok ? "success" : "error"}`;
    status.classList.remove("hidden");
  });
}

// --------------------------------