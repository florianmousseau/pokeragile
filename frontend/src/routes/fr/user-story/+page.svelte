<svelte:head>
  <title>User story&nbsp;: définition, format et exemples | PokerAgile</title>
  <meta name="description" content="Définition de la user story, format En tant que, je veux, afin de, exemples bons et mauvais, critères d'acceptation, INVEST et une story découpée en trois." />
  <link rel="canonical" href="https://pokeragile.com/fr/user-story" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/user-story" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'User story : définition, format « En tant que » et exemples',
    url: 'https://pokeragile.com/fr/user-story',
    inLanguage: 'fr',
    datePublished: '2026-11-27',
    dateModified: '2026-11-27',
    author: { '@type': 'Person', name: 'Florian Mousseau', url: 'https://florianmousseau.com' },
    isPartOf: { '@type': 'WebApplication', name: 'PokerAgile', url: 'https://pokeragile.com' },
  })}<\/script>`}
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Qui écrit les user stories ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le plus souvent le Product Owner, car le Guide Scrum 2020 le rend responsable du Product Backlog. Il peut déléguer l\'écriture.' },
      },
      {
        '@type': 'Question',
        name: 'Les user stories sont-elles obligatoires en Scrum ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Le Guide Scrum 2020 n\'impose aucun format pour les éléments du Product Backlog.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle différence entre critères d\'acceptation et Definition of Done ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Les critères d\'acceptation sont propres à une story. La Definition of Done s\'applique à toutes les stories : tests passés, code relu et mise en production, par exemple.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>User story&nbsp;: définition, format «&nbsp;En tant que&nbsp;» et exemples</h1>

    <p class="lead">
      Une user story décrit en une phrase un besoin d'utilisateur&nbsp;: qui le demande, ce qu'il veut et pourquoi. Elle s'écrit «&nbsp;En tant que [qui], je veux [quoi], afin de [pourquoi]&nbsp;», et des critères d'acceptation disent quand elle est terminée.
    </p>

    <h2>Une user story raconte un besoin, du point de vue de l'utilisateur</h2>
    <p>Une équipe de quatre personnes développe une boutique de vélos en ligne. Claire, la Product Owner, reçoit chaque semaine des appels de clientes qui demandent où est leur colis. Elle écrit cette story&nbsp;:</p>
    <p><strong>En tant que cliente, je veux suivre ma commande, afin de savoir quel jour je serai livrée.</strong></p>
    <p>La user story vient de l'Extreme Programming de Kent Beck, à la fin des années 1990. Le Guide Scrum 2020 ne la cite pas&nbsp;: il parle seulement d'«&nbsp;éléments du Product Backlog&nbsp;».</p>

    <h2>Le format «&nbsp;En tant que, je veux, afin de&nbsp;» et le rôle de chaque morceau</h2>
    <p>Mike Cohn a popularisé ce format dans son livre «&nbsp;User Stories Applied&nbsp;» (2004).</p>
    <ul>
      <li>«&nbsp;En tant que cliente&nbsp;» nomme la personne servie&nbsp;: l'équipe sait à qui poser ses questions.</li>
      <li>«&nbsp;Je veux suivre ma commande&nbsp;» dit l'action attendue et laisse l'écran et la technique aux développeurs.</li>
      <li>«&nbsp;Afin de savoir quel jour je serai livrée&nbsp;» donne le but, qui départage deux solutions.</li>
    </ul>
    <p>Les équipes pressées sautent volontiers le «&nbsp;afin de&nbsp;». Grâce à lui, l'équipe sait qu'une date de livraison compte plus qu'une carte du trajet.</p>

    <h2>Cinq user stories, en mauvaise et en bonne version</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Mauvaise</th><th>Défaut</th><th>Bonne</th></tr></thead>
      <tbody>
        <tr><td>Refaire la page des commandes</td><td>Ni utilisateur ni but</td><td>La story de Claire, avec sa cliente et son but</td></tr>
        <tr><td>En tant que développeur, je veux migrer la base de données</td><td>Tâche technique écrite comme une story</td><td>La migration devient une tâche de la story qu'elle sert, par exemple «&nbsp;filtrer les vélos par taille de cadre&nbsp;»</td></tr>
        <tr><td>En tant qu'utilisateur, je veux une bonne recherche</td><td>Trop vague pour être testée</td><td>En tant que cliente, je veux chercher un vélo par marque, afin de retrouver le modèle vu en magasin</td></tr>
        <tr><td>En tant que cliente, je veux un bouton bleu «&nbsp;Suivre&nbsp;» en haut à droite</td><td>Solution imposée, besoin caché</td><td>En tant que cliente, je veux retrouver ma commande dès l'accueil, afin de ne pas chercher le mail de confirmation</td></tr>
        <tr><td>En tant que cliente, je veux gérer mes retours</td><td>Trop grosse pour un sprint</td><td>En tant que cliente, je veux demander un retour depuis mon compte, afin de recevoir l'étiquette d'envoi</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Les critères d'acceptation s'écrivent «&nbsp;Étant donné, Quand, Alors&nbsp;»</h2>
    <p>Un critère d'acceptation décrit une situation et le résultat attendu. Ce format (Given, When, Then) vient du Behaviour-Driven Development, décrit par Dan North en 2006. Pour la story de suivi, Claire en écrit trois&nbsp;:</p>
    <ul>
      <li>Étant donné une commande expédiée, quand la cliente ouvre «&nbsp;Mes commandes&nbsp;», alors elle voit le statut «&nbsp;Expédiée&nbsp;» et la date de livraison prévue.</li>
      <li>Étant donné une commande pas encore expédiée, quand elle ouvre la même page, alors elle voit «&nbsp;En préparation&nbsp;» et aucune date.</li>
      <li>Étant donné un colis en retard, quand le transporteur change la date, alors la page affiche la nouvelle date le jour même.</li>
    </ul>
    <p>La story est acceptée quand les trois critères passent et que la <a href="/fr/definition-of-done">Definition of Done</a> de l'équipe est respectée.</p>

    <h2>INVEST&nbsp;: six lettres pour vérifier une user story</h2>
    <p>Bill Wake a proposé l'acronyme INVEST en 2003.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Lettre</th><th>Signification</th><th>La story «&nbsp;suivre ma commande&nbsp;»</th></tr></thead>
      <tbody>
        <tr><td>I</td><td>Indépendante</td><td>Elle se livre avant ou après les retours</td></tr>
        <tr><td>N</td><td>Négociable</td><td>Page, mail ou SMS&nbsp;: la forme se discute avec Claire</td></tr>
        <tr><td>V</td><td>Utile (Valuable)</td><td>Le support reçoit moins d'appels</td></tr>
        <tr><td>E</td><td>Estimable</td><td>L'équipe connaît le transporteur et peut voter</td></tr>
        <tr><td>S</td><td>Petite (Small)</td><td>5 points, pour une équipe qui en termine 23 par sprint</td></tr>
        <tr><td>T</td><td>Testable</td><td>Trois critères d'acceptation, donc trois tests</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Une story à 21 points se découpe en trois</h2>
    <p>«&nbsp;En tant que cliente, je veux renvoyer un article, afin d'être remboursée&nbsp;» reçoit 21 <a href="/fr/story-points">story points</a> au premier vote. L'équipe termine en moyenne 23 points par sprint&nbsp;: cette story occuperait le sprint entier.</p>
    <p>Claire la découpe en suivant le parcours de la cliente. Les trois morceaux se livrent dans cet ordre.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Story</th><th>Points</th></tr></thead>
      <tbody>
        <tr><td>En tant que cliente, je veux demander un retour depuis mon compte, afin de recevoir l'étiquette d'envoi</td><td>5</td></tr>
        <tr><td>En tant que magasinier, je veux enregistrer un colis retourné, afin de remettre le vélo en stock et de prévenir le support</td><td>5</td></tr>
        <tr><td>En tant que cliente, je veux être remboursée sur ma carte dès que le colis est enregistré, afin de ne pas relancer le support</td><td>8</td></tr>
      </tbody>
    </table>
    </div>
    <p>Le total passe à 18 points, car chaque morceau est mieux compris que le bloc de départ. Après le premier, la cliente renvoie déjà son vélo, et le support rembourse à la main en attendant les deux suivants.</p>
    <p>Le Guide Scrum 2020 décrit ce travail sous le nom d'affinage du Product Backlog&nbsp;: découper les éléments en éléments plus petits et plus précis. Un élément est prêt pour le <a href="/fr/sprint-planning">Sprint Planning</a> quand l'équipe peut le terminer en un sprint.</p>

    <h2>Epic, user story, tâche&nbsp;: trois tailles de travail</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Niveau</th><th>Exemple</th><th>Taille</th></tr></thead>
      <tbody>
        <tr><td>Epic</td><td>Gérer les retours</td><td>Plusieurs stories, souvent plusieurs sprints</td></tr>
        <tr><td>User story</td><td>Demander un retour depuis mon compte</td><td>Quelques jours, moins d'un sprint</td></tr>
        <tr><td>Tâche</td><td>Créer la table des retours en base</td><td>Une journée ou moins</td></tr>
      </tbody>
    </table>
    </div>
    <p>L'epic et la story parlent à l'utilisateur. Dans l'usage courant, les développeurs créent les tâches pendant le Sprint Planning. Le Guide Scrum 2020 évoque ce découpage en unités de travail d'une journée ou moins.</p>

    <h2>La user story est estimée au poker planning</h2>
    <p>La story arrive ensuite en séance de <a href="/fr/planning-poker">poker planning</a> (ou planning poker). Claire lit la phrase et les trois critères.</p>
    <p>L'équipe <a href="/fr">crée une salle</a> sur PokerAgile, l'outil gratuit de poker planning de ce site, et chacun vote en secret. Pour «&nbsp;suivre ma commande&nbsp;», les cartes affichent 3, 5, 5 et 8. Karim a posé le 8&nbsp;: il pense au troisième critère, qui oblige à écouter les changements de date du transporteur.</p>
    <p>Léa rappelle que le transporteur envoie déjà ces notifications. Au second tour, les quatre cartes affichent 5. La story entre dans le prochain sprint, et ses 5 points compteront dans la <a href="/fr/velocite">vélocité</a> une fois les trois critères validés.</p>

    <h2>Questions fréquentes</h2>

    <h3>Qui écrit les user stories&nbsp;?</h3>
    <p>Le plus souvent le Product Owner, car le Guide Scrum 2020 le rend responsable du Product Backlog. Il peut déléguer l'écriture.</p>

    <h3>Les user stories sont-elles obligatoires en Scrum&nbsp;?</h3>
    <p>Non. Le Guide Scrum 2020 n'impose aucun format pour les éléments du Product Backlog.</p>

    <h3>Quelle différence entre critères d'acceptation et Definition of Done&nbsp;?</h3>
    <p>Les critères d'acceptation sont propres à une story. La <a href="/fr/definition-of-done">Definition of Done</a> s'applique à toutes les stories&nbsp;: tests passés, code relu et mise en production, par exemple.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/velocite">la vélocité</a>,
      <a href="/fr/definition-of-done">la Definition of Done</a>,
      <a href="/fr/t-shirt-sizing">le T-shirt sizing</a>.
    </p>
  </main>

  <footer class="footer">
    <p>
      <a href="https://github.com/florianmousseau/pokeragile" rel="noopener noreferrer">Code source</a>
      | <a href="https://github.com/florianmousseau/pokeragile/blob/main/LICENSE" rel="noopener noreferrer">Licence MIT</a>
      | <a href="/fr/a-propos">À propos</a>
      | <a href="/fr/mentions-legales">Mentions légales</a>
      | <a href="/fr/mentions-legales#confidentialite">Confidentialité</a>
    </p>
  </footer>
</div>

<style>
  .page {
    padding-top: 2rem;
    padding-bottom: 4rem;
    max-width: 48rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  h1 { margin-bottom: 1.5rem; }
  h2 { margin-top: 2rem; margin-bottom: 0.75rem; }
  h3 { margin-top: 1.25rem; margin-bottom: 0.25rem; font-size: 1rem; }

  p, li { line-height: 1.7; }

  .lead { font-size: 1.05rem; color: var(--color-text-muted); }

  ul {
    padding-left: min(1.5rem, 24px);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .table-wrap { overflow-x: auto; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }

  th, td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--color-border);
    text-align: left;
  }

  th {
    background: var(--color-surface);
    font-weight: 700;
  }

  tr:nth-child(even) td {
    background: var(--color-surface);
  }

  .cta {
    margin-top: 2.5rem;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: 0.875rem min(2rem, 32px);
    background: var(--color-primary);
    color: #fff;
    border-radius: var(--radius-lg);
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: opacity 0.15s;
  }

  .btn:hover { opacity: 0.85; }

  .related {
    margin-top: 2.5rem;
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }

  .footer {
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
</style>
