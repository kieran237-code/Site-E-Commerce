import axios from "axios";

export async function translateText(text, targetLang = "EN") {
  try {
    const res = await axios.post("https://api.deepl.com/v2/translate", null, {
      params: {
        text,
        target_lang: targetLang,
        auth_key: "TA_CLE_API" // remplace par ta clé API
      }
    });
    return res.data.translations[0].text;
  } catch (error) {
    console.error("Erreur traduction :", error);
    return text; // fallback si la traduction échoue
  }
}
