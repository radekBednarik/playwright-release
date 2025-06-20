export async function getMarkdown() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/microsoft/playwright/refs/heads/main/docs/src/release-notes-js.md",
    );

    if (!response.ok) {
      console.error("Failed to fetch markdown:", response.statusText);
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return null;
  }
}
