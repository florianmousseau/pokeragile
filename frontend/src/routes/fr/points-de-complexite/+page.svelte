<svelte:head>
  <title>Points de complexité ou jours-homme&nbsp;: pourquoi estimer en points | PokerAgile</title>
  <meta name="description" content="Pourquoi estimer en points de complexité au poker planning&nbsp;: un exemple chiffré, les avantages et les défauts face aux jours-homme, l'erreur 1 point = 1 jour." />
  <link rel="canonical" href="https://pokeragile.com/fr/points-de-complexite" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/points-de-complexite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Points de complexité ou jours-homme : pourquoi estimer en points au poker planning',
    url: 'https://pokeragile.com/fr/points-de-complexite',
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
        name: 'Un point de complexité vaut combien de jours ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Aucun nombre fixe. Le rapport entre points et temps se mesure sur chaque équipe. Celle qui termine 21 à 26 points par sprint de 2 semaines livre 120 points en 5 à 6 sprints, soit 10 à 12 semaines.' },
      },
      {
        '@type': 'Question',
        name: 'Points de complexité et story points, est-ce la même chose ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui. En France, on dit surtout points de complexité, et story points est le nom d\'origine. Les deux désignent la taille relative d\'une user story, et la page sur les story points explique comment calibrer l\'échelle.' },
      },
      {
        '@type': 'Question',
        name: 'Quand faut-il estimer en jours-homme ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Pour un devis au forfait, une tâche isolée confiée à une personne connue, ou une équipe qui ne travaille pas en sprints.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Points de complexité ou jours-homme&nbsp;: pourquoi estimer en points au poker planning</h1>

    <p class="lead">
      Un point de complexité mesure la taille d'une story par rapport à une autre. Le temps vient ensuite&nbsp;: l'équipe compte les points qu'elle termine par sprint, et ce rythme mesuré donne des dates plus justes que des jours-homme devinés.
    </p>

    <h2>Alice dit 2 jours, Bob dit 5 jours, et les deux disent 5 points</h2>
    <p>Prenez la story «&nbsp;exporter les commandes en CSV&nbsp;». Alice connaît le module et annonce 2 jours. Bob vient d'arriver et annonce 5 jours.</p>
    <p>Les deux ont raison, car chacun décrit sa propre vitesse. Une estimation en jours mélange la taille du travail, la personne qui le fait et le temps dont elle disposera.</p>
    <p>L'équipe compare ensuite cette story à sa référence, le formulaire de profil livré le mois dernier, qui vaut 3 points. Alice et Bob répondent pareil&nbsp;: «&nbsp;à peu près deux fois plus gros&nbsp;». La carte la plus proche de 6 est le 5, donc la story CSV vaut 5 points.</p>

    <h2>Un point compare une story à une story de référence</h2>
    <p>Chaque nouvelle story reçoit un chiffre par comparaison avec la référence, pris dans la <a href="/fr/fibonacci">suite de Fibonacci</a>&nbsp;: 1, 2, 3, 5, 8, 13 ou 21. Ce chiffre compte l'effort, la difficulté et l'incertitude, et laisse de côté la vitesse de chacun.</p>
    <p>Au poker planning (ou planning poker), chacun choisit sa carte en secret, puis l'équipe retourne toutes les cartes en même temps. Sur la story «&nbsp;payer par carte chez un nouveau prestataire&nbsp;», Alice pose 5 et Bob 13. Bob a déjà branché ce prestataire ailleurs et connaît les pièges de son API. Il les explique, puis l'équipe revote.</p>
    <p>James Grenning a décrit le planning poker en 2002, et Mike Cohn l'a fait connaître dans «&nbsp;Agile Estimating and Planning&nbsp;» (2005). Le Guide Scrum ne cite pas les points&nbsp;: chaque équipe choisit de les utiliser.</p>

    <h2>La vélocité mesure ce que l'équipe livre par sprint</h2>
    <p>La vélocité est le nombre de points que l'équipe termine à chaque sprint.</p>
    <p>Exemple&nbsp;: une équipe de 4 personnes, en sprints de 2 semaines, doit livrer 30 stories.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th></th><th>En jours-homme</th><th>En points</th></tr></thead>
      <tbody>
        <tr><td>Estimation du lot</td><td>80 jours-homme</td><td>120 points</td></tr>
        <tr><td>Capacité par sprint</td><td>4 personnes x 10 jours = 40 jours-homme</td><td>21, 24 et 26 points sur les 3 derniers sprints</td></tr>
        <tr><td>Prévision</td><td>2 sprints</td><td>5 à 6 sprints</td></tr>
        <tr><td>Réalité</td><td>6 sprints</td><td>6 sprints</td></tr>
      </tbody>
    </table>
    </div>
    <p>Un jour-homme estimé est un jour parfait, passé en entier sur la story. Un sprint réel contient aussi des réunions, des bugs urgents, des revues de code et des absences. Chacun estime en plus un peu court, et l'erreur s'additionne de story en story.</p>
    <p>La vélocité vient des sprints déjà finis, donc elle contient déjà les réunions, les bugs et l'optimisme. Elle varie d'un sprint à l'autre, donc la prévision est une fourchette&nbsp;: 5 à 6 sprints.</p>

    <h2>Cinq gains des points pour l'équipe</h2>
    <ul>
      <li>L'accord vient vite&nbsp;: comparer deux stories est plus facile que prédire une durée.</li>
      <li>La date repose sur ce que l'équipe a déjà livré.</li>
      <li>L'estimation reste valable quand l'équipe change&nbsp;: si Bob progresse, la story CSV vaut toujours 5 points et la vélocité monte.</li>
      <li>Personne ne s'engage seul&nbsp;: «&nbsp;tu avais dit 3 jours&nbsp;» vise une personne, «&nbsp;elle faisait 5 points&nbsp;» décrit une story.</li>
      <li>Un écart entre deux cartes fait sortir un risque oublié avant le début du travail.</li>
    </ul>

    <h2>Cinq limites des points</h2>
    <ul>
      <li>Un client ou un manager comprend «&nbsp;10 jours&nbsp;», rarement «&nbsp;8 points&nbsp;». Il attend une date, que la vélocité fournit.</li>
      <li>Une équipe neuve n'a aucune vélocité. Elle doit finir 2 ou 3 sprints avant de prévoir.</li>
      <li>Les points d'une équipe ne se comparent pas à ceux d'une autre, car chacune a sa story de référence.</li>
      <li>Les points gonflent dès qu'ils deviennent un objectif. Un manager qui réclame plus de points par sprint obtient des 5 là où l'équipe posait des 3, à travail égal.</li>
      <li>Un devis au forfait ou une facture se chiffre en jours. Les points servent à prévoir.</li>
    </ul>

    <h2>La règle «&nbsp;1 point = 1 jour&nbsp;» ramène l'équipe aux jours-homme</h2>
    <p>Beaucoup d'équipes estiment en points, puis affichent une table de conversion vers les jours. Chacun se remet alors à penser en jours et traduit son chiffre en points. L'estimation dépend de nouveau de la personne et de son optimisme.</p>

    <h2>La seule conversion juste divise les points restants par la vélocité</h2>
    <p>La date d'un lot se calcule par une division&nbsp;: <strong>points restants / vélocité = nombre de sprints</strong>. Le calcul se fait deux fois, avec la vélocité la plus basse et la plus haute des derniers sprints. Pour 120 points, 26 points par sprint donnent 4,6 sprints et 21 points en donnent 5,7. L'équipe annonce 5 à 6 sprints, soit 10 à 12 semaines.</p>
    <p>Un manager lit une date unique comme un engagement. Une fourchette lui montre la marge d'erreur de la prévision.</p>
    <p>Ce calcul vaut pour un lot de stories. Sur une story seule, il donne un chiffre faux, car la vélocité est une moyenne.</p>

    <h2>Points pour prévoir en équipe, jours-homme pour chiffrer un devis</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Situation</th><th>Choix</th></tr></thead>
      <tbody>
        <tr><td>Équipe stable qui travaille en sprints</td><td>Points</td></tr>
        <tr><td>Prévoir une date pour un lot de stories</td><td>Points et vélocité</td></tr>
        <tr><td>Devis au forfait, facture</td><td>Jours-homme</td></tr>
        <tr><td>Tâche isolée, confiée à une personne connue</td><td>Jours ou heures</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Questions fréquentes</h2>
    <h3>Un point de complexité vaut combien de jours&nbsp;?</h3>
    <p>Aucun nombre fixe. Le rapport entre points et temps se mesure sur chaque équipe. Celle qui termine 21 à 26 points par sprint de 2 semaines livre 120 points en 5 à 6 sprints, soit 10 à 12 semaines.</p>
    <h3>Points de complexité et story points, est-ce la même chose&nbsp;?</h3>
    <p>Oui. En France, on dit surtout points de complexité, et story points est le nom d'origine. Les deux désignent la taille relative d'une user story, et la <a href="/fr/story-points">page sur les story points</a> explique comment calibrer l'échelle.</p>
    <h3>Quand faut-il estimer en jours-homme&nbsp;?</h3>
    <p>Pour un devis au forfait, une tâche isolée confiée à une personne connue, ou une équipe qui ne travaille pas en sprints.</p>

    <div class="cta">
      <a href="/fr" class="btn">Estimer en points avec votre équipe</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/fibonacci">la suite de Fibonacci</a>,
      <a href="/fr/t-shirt-sizing">le T-shirt sizing</a>,
      <a href="/fr/estimation-agile">l'estimation agile</a>.
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
