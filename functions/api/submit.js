export async function onRequestPost({ request, env }) {
  const webhook = env.DISCORD_WEBHOOK_URL;
  if (!webhook) return new Response("Configuration incomplète : l’administrateur doit définir DISCORD_WEBHOOK_URL.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  let form;
  try { form = await request.formData(); } catch { return new Response("Formulaire invalide.", { status: 400 }); }
  if (String(form.get("website") || "").trim()) return Response.redirect(new URL("/merci.html", request.url).toString(), 303);
  const get = (key, max = 1000) => String(form.get(key) || "").trim().slice(0, max);
  const data = {
    discord: get("discord", 100), genshin: get("genshin", 100), age: get("age", 3),
    experience: get("experience", 1000), character: get("character", 1000), clan: get("clan", 100),
    objectifs: get("objectifs", 1000), background: get("background", 1000), discover: get("discover", 500)
  };
  if (!data.discord || !data.age || !data.experience || !data.character || !data.clan || !data.objectifs || !data.background || !data.discover)
    return new Response("Il manque une réponse obligatoire. Retourne au formulaire et vérifie les champs.", { status: 400, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  const clean = s => s.replace(/@everyone|@here/g, "@\u200b");
  const fields = [
    ["Pseudo Discord", data.discord], ["Pseudo Genshin Impact", data.genshin || "Non renseigné"],
    ["Âge", data.age], ["Région / clan", data.clan], ["Expérience RP", data.experience],
    ["Personnage souhaité", data.character], ["Objectifs", data.objectifs],
    ["Background", data.background], ["Comment a connu le serveur", data.discover]
  ].map(([name, value]) => ({ name, value: clean(value).slice(0, 1024) || "—", inline: false }));
  const payload = {
    username: "SUZU RP · Candidatures",
    embeds: [{ title: "✦ Nouvelle candidature SUZU RP ✦", color: 0x7552c8, fields, timestamp: new Date().toISOString(), footer: { text: "Whitelist écrite · Genshin Impact RP" } }],
    allowed_mentions: { parse: [] }
  };
  let response;
  try { response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
  catch { return new Response("Impossible de joindre Discord. Réessaie plus tard ou contacte l’équipe SUZU.", { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
  if (!response.ok) return new Response("Discord n’a pas accepté la candidature. Contacte l’équipe SUZU pour signaler le problème.", { status: 502, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return Response.redirect(new URL("/merci.html", request.url).toString(), 303);
}
