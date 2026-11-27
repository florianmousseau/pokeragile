<svelte:head>
  <title>Sprint planning&nbsp;: déroulé, durée et objectif de sprint en Scrum | PokerAgile</title>
  <meta name="description" content="Le sprint planning selon le Guide Scrum 2020&nbsp;: les trois sujets, la durée, un déroulé de 2 heures, l'objectif de sprint et le calcul avec la vélocité." />
  <link rel="canonical" href="https://pokeragile.com/fr/sprint-planning" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/sprint-planning" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Sprint planning : déroulé, durée et objectif de sprint',
    url: 'https://pokeragile.com/fr/sprint-planning',
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
        name: 'Combien de temps dure un sprint planning ?',
        acceptedAnswer: { '@type': 'Answer', text: '8 heures au plus pour un sprint d\'un mois selon le Guide Scrum 2020, et 2 à 4 heures pour un sprint de 2 semaines dans l\'usage courant.' },
      },
      {
        '@type': 'Question',
        name: 'Qui anime le sprint planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le Guide Scrum ne nomme aucun animateur. Dans l\'usage courant, le Scrum Master facilite, le Product Owner ouvre avec sa proposition et les développeurs mènent la sélection et le plan.' },
      },
      {
        '@type': 'Question',
        name: 'Estime-t-on les stories pendant le sprint planning ?',
        acceptedAnswer: { '@type': 'Answer', text: 'De préférence avant, pendant l\'affinage du backlog, et le jour du sprint planning seulement pour une story nouvelle ou modifiée.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Sprint planning&nbsp;: déroulé, durée et objectif de sprint</h1>

    <p class="lead">
      Le sprint planning est la réunion qui ouvre chaque sprint&nbsp;: l'équipe Scrum y fixe un objectif, choisit les éléments du backlog à réaliser et prépare son plan. Le Guide Scrum 2020 la limite à 8 heures pour un sprint d'un mois. Pour un sprint de 2 semaines, l'usage courant est de 2 à 4 heures.
    </p>

    <h2>Le sprint planning traite trois sujets&nbsp;: pourquoi, quoi, comment</h2>
    <p>Le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum 2020</a> découpe la réunion de planification de sprint en trois sujets, dans cet ordre.</p>
    <ol>
      <li>Pourquoi ce sprint a de la valeur. Le Product Owner propose une façon d'augmenter la valeur du produit, puis toute l'équipe rédige l'objectif de sprint.</li>
      <li>Quoi faire pendant ce sprint. Les développeurs choisissent les éléments du Product Backlog, en discutant avec le Product Owner.</li>
      <li>Comment le faire. Les développeurs découpent chaque élément en tâches, souvent d'une journée ou moins.</li>
    </ol>
    <p>L'objectif de sprint doit être écrit avant la fin de la réunion.</p>

    <h2>Durée&nbsp;: 8 heures au plus pour un sprint d'un mois</h2>
    <p>Le Guide fixe une seule limite (timebox)&nbsp;: 8 heures au maximum pour un sprint d'un mois. Pour un sprint plus court, il dit seulement que la réunion est «&nbsp;généralement plus courte&nbsp;».</p>
    <p>L'usage applique une règle de proportion, soit 4 heures au plus pour 2 semaines et 2 heures pour 1 semaine. Cette règle vient des équipes et ne figure pas dans le Guide.</p>

    <h2>Toute l'équipe Scrum participe</h2>
    <p>Le Guide Scrum réunit toute l'équipe Scrum&nbsp;: le Product Owner, le Scrum Master et les développeurs. Le Product Owner s'assure que chacun est prêt à discuter des éléments les plus importants du Product Backlog.</p>
    <p>Le Scrum Master veille, comme pour chaque événement Scrum, à ce que la réunion ait lieu et respecte sa durée. L'équipe peut inviter une personne extérieure pour un conseil, par exemple un expert du paiement en ligne.</p>

    <h2>Déroulé d'un sprint planning de 2 heures, pour un sprint de 2 semaines</h2>
    <p>Exemple&nbsp;: une équipe de 4 développeurs, Alice, Bob, Chloé et David, travaille en sprints de 2 semaines. Ses stories sont déjà estimées, et 2 heures lui suffisent dans cet exemple.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Horaire</th><th>Sujet</th><th>Résultat</th></tr></thead>
      <tbody>
        <tr><td>0 h 00 à 0 h 10</td><td>Le Product Owner présente l'état du produit, et chacun annonce ses absences</td><td>Capacité du sprint connue</td></tr>
        <tr><td>0 h 10 à 0 h 30</td><td>Pourquoi&nbsp;: proposition du Product Owner, puis rédaction en équipe</td><td>Objectif de sprint en brouillon</td></tr>
        <tr><td>0 h 30 à 1 h 10</td><td>Quoi&nbsp;: lecture des stories du haut du backlog, questions, sélection</td><td>Stories retenues</td></tr>
        <tr><td>1 h 10 à 1 h 50</td><td>Comment&nbsp;: découpage en tâches, repérage des dépendances</td><td>Plan des premiers jours</td></tr>
        <tr><td>1 h 50 à 2 h 00</td><td>Relecture de l'objectif face aux stories retenues</td><td>Objectif de sprint définitif</td></tr>
      </tbody>
    </table>
    </div>
    <p>Le plan n'a pas besoin de couvrir les 10 jours. Les tâches des premiers jours suffisent, et les développeurs complètent le reste pendant le sprint.</p>

    <h2>Un bon objectif de sprint décrit un résultat pour l'utilisateur</h2>
    <p>Dans l'usage courant, l'objectif de sprint tient en une phrase et dit ce qui aura changé à la fin du sprint. Selon le Guide, c'est l'engagement des développeurs. Les stories choisies restent une prévision, que les développeurs peuvent renégocier avec le Product Owner en cours de route.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Objectif</th><th>Verdict</th></tr></thead>
      <tbody>
        <tr><td>«&nbsp;Finir les tickets 412, 415 et 420&nbsp;»</td><td>Mauvais&nbsp;: une liste de tickets, aucun résultat visible</td></tr>
        <tr><td>«&nbsp;Améliorer le tunnel de commande&nbsp;»</td><td>Mauvais&nbsp;: personne ne peut dire s'il est atteint</td></tr>
        <tr><td>«&nbsp;Un client paie sa commande par carte et la retrouve dans son historique&nbsp;»</td><td>Bon&nbsp;: un résultat que l'on vérifie en démonstration</td></tr>
      </tbody>
    </table>
    </div>
    <p>L'équipe d'Alice retient le troisième. Quand une urgence arrive au jour 6, il sert de critère pour trier ce qui peut attendre.</p>

    <h2>La vélocité et la capacité fixent la quantité à prendre</h2>
    <p>Le Guide demande aux développeurs de regarder leurs résultats passés, leur capacité à venir et leur <a href="/fr/definition-of-done">Definition of Done</a>, la liste de critères qu'un élément doit remplir pour être terminé. Il ne cite ni les <a href="/fr/story-points">story points</a> ni la <a href="/fr/velocite">vélocité</a>, que beaucoup d'équipes utilisent pour ce calcul.</p>
    <p>L'équipe a terminé 21, 24 et 26 points sur ses trois derniers sprints, soit une vélocité moyenne d'environ 24 points. Un sprint complet représente 4 personnes x 10 jours, donc 40 jours de présence. Bob pose 4 jours de congé, il en reste 36, soit 90&nbsp;% de la capacité habituelle.</p>
    <p>24 points x 90&nbsp;% donnent 21,6. L'équipe vise donc 21 points et prend les stories dans l'ordre du backlog.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Story retenue</th><th>Points</th><th>Total</th></tr></thead>
      <tbody>
        <tr><td>Payer par carte chez un nouveau prestataire</td><td>13</td><td>13</td></tr>
        <tr><td>Afficher l'historique des commandes</td><td>3</td><td>16</td></tr>
        <tr><td>Exporter les commandes en CSV</td><td>5</td><td>21</td></tr>
      </tbody>
    </table>
    </div>
    <p>La story suivante vaut 8 points et porterait le total à 29. Elle reste dans le Product Backlog. L'export CSV ne sert pas l'objectif. Il est en haut du backlog et tient dans les 5 points de capacité restants&nbsp;: l'objectif ne couvre pas forcément tout le sprint.</p>

    <h2>Sprint planning et poker planning sont deux réunions différentes</h2>
    <p>Le sprint planning décide du contenu du sprint. Le <a href="/fr/planning-poker">poker planning</a> (ou planning poker) sert à estimer la taille d'une <a href="/fr/user-story">user story</a>&nbsp;: chacun vote en secret, puis l'équipe retourne les cartes en même temps. Le Guide Scrum ne parle pas du poker planning, qui est une technique d'<a href="/fr/estimation-agile">estimation agile</a> parmi d'autres.</p>
    <p>L'estimation se fait de préférence avant, pendant l'affinage du backlog (refinement). L'équipe d'Alice y consacre une heure au milieu de chaque sprint&nbsp;: elle <a href="/fr">crée une salle</a> sur PokerAgile, l'outil gratuit de poker planning de ce site, et vote sur les stories à venir. Le jour du sprint planning, les 13, 3 et 5 points sont déjà connus.</p>
    <p>Il reste un cas où l'on vote pendant le sprint planning&nbsp;: une story ajoutée ou modifiée la veille. Un vote rapide suffit alors, sur l'<a href="/fr/fibonacci">échelle de Fibonacci</a> (1, 2, 3, 5, 8, 13, 21), où l'écart entre deux cartes grandit avec la taille.</p>

    <h2>Le Sprint Backlog sort de la réunion</h2>
    <p>Selon le Guide, le Sprint Backlog réunit trois choses&nbsp;: l'objectif de sprint (le pourquoi), les éléments choisis (le quoi) et le plan pour les livrer (le comment).</p>
    <p>Pour l'équipe d'Alice, cela donne une phrase d'objectif, 3 stories pour 21 points et une quinzaine de tâches sur les premiers jours. Le Guide le décrit comme un plan fait par et pour les développeurs, mis à jour tout au long du sprint.</p>

    <h2>Trois erreurs fréquentes en sprint planning</h2>
    <ul>
      <li>Sortir de la réunion sans objectif. L'équipe repart avec une liste de tickets, et rien ne guide ses choix quand un imprévu arrive.</li>
      <li>Prendre plus que la vélocité. Une équipe à 24 points qui en prend 34 «&nbsp;pour faire plaisir&nbsp;» termine le sprint avec des stories à moitié faites, qui comptent pour zéro. L'écart entre la prévision et le résultat se discute en <a href="/fr/retrospective">rétrospective</a>.</li>
      <li>Estimer tout le backlog pendant la réunion. Les 2 heures passent en votes, et il ne reste plus de temps pour le plan.</li>
    </ul>

    <h2>Questions fréquentes</h2>
    <h3>Combien de temps dure un sprint planning&nbsp;?</h3>
    <p>8 heures au plus pour un sprint d'un mois selon le Guide Scrum 2020, et 2 à 4 heures pour un sprint de 2 semaines dans l'usage courant.</p>
    <h3>Qui anime le sprint planning&nbsp;?</h3>
    <p>Le Guide Scrum ne nomme aucun animateur. Dans l'usage courant, le Scrum Master facilite, le Product Owner ouvre avec sa proposition et les développeurs mènent la sélection et le plan.</p>
    <h3>Estime-t-on les stories pendant le sprint planning&nbsp;?</h3>
    <p>De préférence avant, pendant l'affinage du backlog, et le jour du sprint planning seulement pour une story nouvelle ou modifiée.</p>

    <div class="cta">
      <a href="/fr" class="btn">Créer une salle</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/velocite">la vélocité</a>,
      <a href="/fr/user-story">la user story</a>,
      <a href="/fr/definition-of-done">la Definition of Done</a>,
      <a href="/fr/points-de-complexite">les points de complexité</a>,
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

  ul, ol {
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
