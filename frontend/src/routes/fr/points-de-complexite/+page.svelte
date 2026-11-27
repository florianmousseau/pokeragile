<svelte:head>
  <title>Points de complexité ou jours-homme&nbsp;: pourquoi estimer en points | PokerAgile</title>
  <meta name="description" content="Pourquoi estimer en points de complexité plutôt qu'en jours-homme au poker planning&nbsp;: un exemple chiffré, les avantages, les défauts et l'erreur à ne pas faire." />
  <link rel="canonical" href="https://pokeragile.com/fr/points-de-complexite" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/points-de-complexite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Points de complexité ou jours-homme : pourquoi estimer en points',
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
        acceptedAnswer: { '@type': 'Answer', text: 'Aucun nombre fixe. Le lien entre points et temps se mesure : une équipe qui termine 24 points par sprint de deux semaines livrera 120 points en 5 sprints, soit 10 semaines.' },
      },
      {
        '@type': 'Question',
        name: 'Points de complexité et story points, est-ce la même chose ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui. Points de complexité est le nom le plus courant en France, story points le nom d\'origine. Les deux désignent la taille relative d\'une user story.' },
      },
      {
        '@type': 'Question',
        name: 'Quand faut-il estimer en jours-homme ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Pour un devis au forfait, une tâche isolée faite par une personne connue, ou une équipe qui ne travaille pas en sprints. Pour prévoir le travail d\'une équipe stable, les points et la vélocité donnent une date plus juste.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Points de complexité ou jours-homme&nbsp;: pourquoi estimer en points au poker planning</h1>

    <p class="lead">
      Un point de complexité ne mesure pas un temps. Il dit combien une story est plus grosse qu'une autre. Le temps, lui, se mesure après coup, sprint après sprint. C'est ce qui rend les dates plus justes qu'avec des jours-homme.
    </p>

    <h2>Le problème des jours-homme, en une story</h2>
    <p>Prenez la story «&nbsp;exporter les commandes en CSV&nbsp;». Alice connaît le module&nbsp;: elle dit 2 jours. Bob vient d'arriver&nbsp;: il dit 5 jours.</p>
    <p>Les deux ont raison. Ils ne parlent pas de la story, ils parlent d'eux. Une estimation en jours mélange trois choses&nbsp;: la taille du travail, la personne qui le fait et le temps qu'elle aura vraiment.</p>
    <p>Posez-leur une autre question&nbsp;: «&nbsp;Par rapport au formulaire de profil livré le mois dernier, c'est plus gros&nbsp;?&nbsp;» Alice et Bob répondent pareil&nbsp;: «&nbsp;à peu près deux fois plus gros.&nbsp;» Sur la taille, ils sont d'accord. C'est ce que mesure un point.</p>

    <h2>Un point de complexité, c'est une taille</h2>
    <p>Un point est une <strong>taille relative</strong>. L'équipe choisit une story de référence, par exemple à 3 points, et compare chaque nouvelle story à celle-là. Le chiffre contient l'effort, la complexité et l'incertitude, mais pas la vitesse de la personne.</p>
    <p>Au poker planning, chacun pose sa carte en secret, puis tout le monde révèle en même temps. Quand Alice pose 5 et Bob pose 13, l'écart ne vient pas de leur vitesse&nbsp;: il vient d'un risque que l'un voit et l'autre non. La discussion qui suit vaut plus que le chiffre.</p>

    <h2>Le temps se mesure, il ne se devine pas</h2>
    <p>C'est le point que peu de gens voient. Avec des jours-homme, l'équipe <strong>devine</strong> une durée. Avec des points, elle <strong>mesure</strong> combien de points elle termine par sprint&nbsp;: c'est la vélocité.</p>
    <p>Une équipe de 4 personnes, sprints de 2 semaines, a 30 stories à livrer.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th></th><th>En jours-homme</th><th>En points</th></tr></thead>
      <tbody>
        <tr><td>Estimation du lot</td><td>80 jours-homme</td><td>120 points</td></tr>
        <tr><td>Capacité par sprint</td><td>4 personnes x 10 jours = 40 jours-homme</td><td>24 points, mesurés sur les 3 derniers sprints</td></tr>
        <tr><td>Prévision</td><td>2 sprints</td><td>5 sprints</td></tr>
        <tr><td>Réalité</td><td>5 sprints</td><td>5 sprints</td></tr>
      </tbody>
    </table>
    </div>
    <p>Pourquoi les jours se trompent&nbsp;? Un jour-homme estimé est un jour parfait. Dans un vrai sprint, il y a des réunions, des bugs urgents, des revues de code et des absences. Et chacun est un peu optimiste. L'erreur s'additionne story après story.</p>
    <p>La vélocité, elle, vient des sprints réels. Les réunions, les bugs, l'optimisme&nbsp;: tout est déjà dedans. Si l'équipe se trompe toujours dans le même sens, la vélocité corrige seule. Les points n'ont pas besoin d'être justes, seulement <strong>cohérents entre eux</strong>.</p>

    <h2>Les avantages des points</h2>
    <ul>
      <li><strong>On se met d'accord vite.</strong> Comparer deux stories est facile. Prédire une durée ne l'est pas.</li>
      <li><strong>La date est plus juste.</strong> Elle vient de ce que l'équipe a vraiment livré, pas d'un calcul sur des jours parfaits.</li>
      <li><strong>L'estimation reste vraie.</strong> Quand Bob progresse, la story fait toujours 5 points. C'est la vélocité qui monte.</li>
      <li><strong>Ce n'est pas une promesse.</strong> «&nbsp;Tu avais dit 3 jours&nbsp;» met la pression sur une personne. «&nbsp;Elle faisait 5 points&nbsp;» ne vise personne.</li>
      <li><strong>Le débat porte sur le travail.</strong> Un écart de cartes révèle un risque oublié, pas une différence de niveau.</li>
    </ul>

    <h2>Les défauts des points</h2>
    <ul>
      <li><strong>C'est abstrait.</strong> Un client ou un manager comprend «&nbsp;10 jours&nbsp;», pas «&nbsp;8 points&nbsp;». Il faut lui donner une date, calculée avec la vélocité.</li>
      <li><strong>Il faut un historique.</strong> Une équipe neuve n'a pas de vélocité. Il faut 2 ou 3 sprints pour la mesurer.</li>
      <li><strong>Ça ne sert qu'à une équipe.</strong> 30 points chez une équipe et 60 chez une autre ne veulent rien dire. Chacune a sa référence.</li>
      <li><strong>Ça s'abîme si on en fait un objectif.</strong> Demandez plus de points par sprint et un 3 devient un 5, à travail égal.</li>
      <li><strong>Ça ne fait pas un devis.</strong> Pour un forfait ou une facture, il faut des jours. Les points prévoient, ils ne facturent pas.</li>
    </ul>

    <h2>L'erreur à ne pas faire&nbsp;: 1 point = 1 jour</h2>
    <p>Beaucoup d'équipes estiment en points, puis affichent une table de conversion. Dès lors, chacun pense en jours et traduit en points. Les points deviennent des jours-homme avec un autre nom, et tous leurs avantages disparaissent.</p>
    <p>Si on vous demande une date, faites une seule division&nbsp;: <strong>points restants / vélocité = nombre de sprints</strong>. 120 points à 24 points par sprint, c'est 5 sprints, soit 10 semaines. Cette conversion vaut pour un lot, jamais pour une story seule.</p>

    <h2>Points ou jours-homme&nbsp;: lequel choisir&nbsp;?</h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Situation</th><th>Choix</th></tr></thead>
      <tbody>
        <tr><td>Équipe stable qui travaille en sprints</td><td>Points</td></tr>
        <tr><td>Prévoir une date pour un lot de stories</td><td>Points et vélocité</td></tr>
        <tr><td>Devis au forfait, facture</td><td>Jours-homme</td></tr>
        <tr><td>Tâche isolée, faite par une personne connue</td><td>Jours ou heures</td></tr>
      </tbody>
    </table>
    </div>

    <h2>Questions fréquentes</h2>
    <h3>Un point de complexité vaut combien de jours&nbsp;?</h3>
    <p>Aucun nombre fixe. Le lien entre points et temps se mesure&nbsp;: une équipe qui termine 24 points par sprint de deux semaines livrera 120 points en 5 sprints, soit 10 semaines.</p>
    <h3>Points de complexité et story points, est-ce la même chose&nbsp;?</h3>
    <p>Oui. Points de complexité est le nom le plus courant en France, story points le nom d'origine. La <a href="/fr/story-points">page sur les story points</a> détaille le calibrage et l'échelle de Fibonacci.</p>
    <h3>Quand faut-il estimer en jours-homme&nbsp;?</h3>
    <p>Pour un devis au forfait, une tâche isolée faite par une personne connue, ou une équipe qui ne travaille pas en sprints. Pour prévoir le travail d'une équipe stable, les points et la vélocité donnent une date plus juste.</p>

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
