SUZU RP — Cloudflare Pages + Discord webhook

CONTENU
- index.html : formulaire SUZU RP
- merci.html : confirmation après envoi
- functions/api/submit.js : fonction serveur qui transmet la candidature au webhook Discord

IMPORTANT
Le webhook Discord est un secret. Ne le mets JAMAIS dans index.html, dans le JavaScript du navigateur, ni dans un message public.

PUBLICATION
1. Crée un dépôt GitHub privé ou public et ajoute tous les fichiers en conservant la structure.
2. Dans Cloudflare Dashboard, Workers & Pages > Create > Pages > Connect to Git, connecte ce dépôt.
3. Pour un site HTML simple, laisse la commande de build vide et choisis le dossier racine comme répertoire de sortie.
4. Après la création du projet, ouvre Settings > Variables and Secrets (ou Settings > Environment variables selon l’interface). Ajoute une variable secrète nommée DISCORD_WEBHOOK_URL, avec l’URL du webhook du salon Discord voulu. N’écris pas l’URL dans le code.
5. Redéploie le projet après avoir ajouté la variable.
6. Fais une candidature test et vérifie le salon Discord.

DISCORD
Dans le salon souhaité : Modifier le salon / Intégrations / Webhooks / Nouveau webhook, choisis le salon puis copie l’URL. Colle-la uniquement dans la variable secrète de Cloudflare. Si le webhook est divulgué, supprime-le et crée-en un nouveau.

NOTE
La fonction ne publie rien tant que DISCORD_WEBHOOK_URL n’est pas configurée et le site déployé. Hébergement externe ne veut pas dire que le site a déjà été publié : tu dois connecter le dépôt et déployer.
