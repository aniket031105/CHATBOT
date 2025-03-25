export const supportedLanguages = {
    en: "English",
    es: "Español",
    hi: "हिन्दी",
    fr: "Français",
    de: "Deutsch",
  };
  
  export async function translateText(text, targetLang) {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error("Translation Error:", error);
      return text; // Fallback to original text
    }
  }
  