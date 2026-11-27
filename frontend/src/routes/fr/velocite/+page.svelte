<svelte:head>
  <title>Vélocité Scrum&nbsp;: définition, calcul et exemple sur 6 sprints | PokerAgile</title>
  <meta name="description" content="Vélocité Scrum&nbsp;: définition, calcul pas à pas sur 6 sprints, date d'un lot avec fourchette, capacité, burndown et les erreurs qui faussent le chiffre." />
  <link rel="canonical" href="https://pokeragile.com/fr/velocite" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/velocite" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Vélocité Scrum : définition, calcul et exemple sur 6 sprints',
    url: 'https://pokeragile.com/fr/velocite',
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
        name: 'Comment calculer la vélocité d\'une équipe Scrum ?',
        acceptedAnswer: { '@type': 'Answer', text: 'L\'équipe additionne les points des stories terminées à la fin de chaque sprint, puis fait la moyenne des 3 derniers sprints. Avec 24, 21 et 27 points, sa vélocité est de 24 points par sprint.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est une bonne vélocité en Scrum ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Aucun chiffre n\'est bon ou mauvais, car la vélocité de deux équipes ne se compare pas. Une vélocité stable d\'un sprint à l\'autre donne des prévisions fiables.' },
      },
      {
        '@type': 'Question',
        name: 'La vélocité est-elle obligatoire en Scrum ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Le Guide Scrum 2020 ne la mentionne pas, et chaque équipe choisit de la suivre ou non.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle différence entre vélocité et capacité ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La vélocité compte les points terminés par sprint dans le passé. La capacité compte les jours de présence de l\'équipe sur le sprint à venir. La première se corrige par la seconde quand des congés ou un jour férié réduisent la présence.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Vélocité Scrum&nbsp;: définition, calcul et exemple sur 6 sprints</h1>

    <p class="lead">
      La vélocité d'une équipe Scrum est le total des points des stories terminées pendant un sprint. La moyenne des 3 derniers sprints sert à prévoir le sprint suivant et la date d'un lot de stories.
    </p>

    <h2>La vélocité compte les points des stories terminées dans le sprint</h2>
    <p>À la fin du sprint, l'équipe additionne les <a href="/fr/story-points">story points</a> de chaque <a href="/fr/user-story">user story</a> terminée. Le total est sa vélocité pour ce sprint (velocity en anglais). On parle aussi de vélocité agile ou de vélocité d'équipe.</p>
    <p>Les points viennent de l'estimation faite avant le sprint, le plus souvent au <a href="/fr/planning-poker">poker planning</a> (ou planning poker). La vélocité se mesure après coup, sur du travail livré.</p>

    <h2>Une story à moitié faite compte zéro</h2>
    <p>Une story est terminée quand elle respecte la <a href="/fr/definition-of-done">Definition of Done</a> de l'équipe. Une story développée mais pas encore testée vaut zéro point dans le sprint.</p>
    <p>Le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum 2020</a> pose la règle sur le travail non fini&nbsp;: un élément qui ne respecte pas la Definition of Done ne peut pas être livré et retourne dans le Product Backlog. Le Guide ne parle pas de points. L'usage courant est de les compter dans le sprint où la story est finie.</p>

    <h2>Calcul de la vélocité&nbsp;: une équipe de 5 personnes sur 6 sprints</h2>
    <p>Une équipe de 5 développeurs construit une application de réservation, en sprints de 2 semaines. Voici ses 6 premiers sprints.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Sprint</th><th>Points terminés</th><th>Remarque</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>18</td><td></td></tr>
        <tr><td>2</td><td>22</td><td></td></tr>
        <tr><td>3</td><td>20</td><td></td></tr>
        <tr><td>4</td><td>24</td><td></td></tr>
        <tr><td>5</td><td>21</td><td>Une story de 8 points pas finie, comptée zéro</td></tr>
        <tr><td>6</td><td>27</td><td>La story de 8 points est terminée et comptée ici</td></tr>
      </tbody>
    </table>
    </div>
    <p>Le calcul tient en trois étapes.</p>
    <ol>
      <li>Additionner les points terminés de chaque sprint&nbsp;: c'est la colonne du milieu.</li>
      <li>Faire la moyenne des 3 derniers sprints&nbsp;: (24 + 21 + 27) / 3 = 24 points.</li>
      <li>Relever le plus bas et le plus haut de ces 3 sprints&nbsp;: 21 et 27 points.</li>
    </ol>
    <p>La vélocité de l'équipe est de 24 points par sprint, dans une fourchette de 21 à 27. Prendre les 3 derniers sprints est l'usage courant.</p>
    <p>Le report de la story de 8 points creuse le sprint 5 et gonfle le sprint 6. La moyenne reste juste, mais l'écart de 21 à 27 vient en partie de ce report.</p>

    <h2>Prévoir une date&nbsp;: points restants divisés par la vélocité</h2>
    <p>Il reste 150 points dans le backlog avant la sortie de la version 2. La formule est <strong>points restants / vélocité = nombre de sprints</strong>, arrondi au sprint supérieur.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th>Hypothèse</th><th>Vélocité</th><th>Calcul</th><th>Sprints</th></tr></thead>
      <tbody>
        <tr><td>Rythme haut</td><td>27</td><td>150 / 27 = 5,6</td><td>6</td></tr>
        <tr><td>Moyenne</td><td>24</td><td>150 / 24 = 6,3</td><td>7</td></tr>
        <tr><td>Rythme bas</td><td>21</td><td>150 / 21 = 7,1</td><td>8</td></tr>
      </tbody>
    </table>
    </div>
    <p>L'équipe annonce 6 à 8 sprints, soit 12 à 16 semaines, et recalcule à chaque fin de sprint. La fourchette se resserre quand le backlog diminue.</p>
    <p>Le calcul vaut pour un lot. Sur une story seule, la moyenne ne dit rien de fiable. La page <a href="/fr/points-de-complexite">points de complexité ou jours-homme</a> compare cette prévision à un chiffrage en jours.</p>

    <h2>Congés et jours fériés&nbsp;: la vélocité se corrige par la capacité</h2>
    <p>La capacité est le nombre de jours de présence de l'équipe sur un sprint. En temps normal, 5 personnes pendant 10 jours ouvrés donnent 50 jours.</p>
    <p>Au sprint 7, Léa prend 5 jours de congé. Un jour férié, en dehors de ses congés, retire 1 jour à chacun des 5 membres. Il reste 40 jours sur 50, soit 80&nbsp;% de la capacité habituelle.</p>
    <p>L'équipe applique le même rapport à sa vélocité&nbsp;: 24 x 0,8 = 19,2, arrondi à 19 points. Au <a href="/fr/sprint-planning">Sprint Planning</a>, elle prend donc environ 19 points au lieu de 24.</p>
    <p>La correction ne sert que pour les écarts nets. Une absence d'une journée est déjà contenue dans la moyenne des sprints passés.</p>

    <h2>Une nouvelle équipe mesure sa vélocité en 3 sprints</h2>
    <p>Une équipe qui démarre n'a aucun historique. Pour son premier sprint, elle prend les stories une par une et s'arrête quand elle juge le sprint plein.</p>
    <p>L'équipe de l'exemple avait pris 25 points au sprint 1 et en a terminé 18. Elle s'est servie de ce 18 pour remplir le sprint 2. Après 3 sprints, la moyenne remplace l'intuition, et la première prévision de date devient possible.</p>
    <p>Pour estimer ces premières stories, un membre de l'équipe <a href="/fr">crée une salle</a> sur PokerAgile, l'outil gratuit de poker planning de ce site, et chacun vote en secret.</p>

    <h2>Burndown et burnup&nbsp;: deux graphiques tirés des mêmes points</h2>
    <p>Le burndown chart trace les points restants jour après jour, et sa courbe descend vers zéro à la fin du sprint. Le burnup chart trace les points terminés, qui montent vers une ligne représentant le total du lot.</p>
    <p>Le burnup montre en plus les ajouts de périmètre&nbsp;: la ligne du total monte quand le backlog passe de 150 à 165 points. Le Guide Scrum 2020 cite ces graphiques comme des pratiques utiles, qui ne remplacent pas l'observation du travail réel.</p>

    <h2>Cinq erreurs qui faussent la vélocité</h2>
    <ul>
      <li>Comparer deux équipes. Chacune a sa story de référence, donc 24 points chez l'une et 60 chez l'autre ne disent pas laquelle livre le plus.</li>
      <li>En faire un objectif. Une équipe sommée de passer de 24 à 30 points y arrive en posant des 5 là où elle posait des 3.</li>
      <li>Gonfler les points. Le chiffre monte, le travail livré reste le même, et les 150 points du backlog ne valent plus 6 à 8 sprints.</li>
      <li>Compter les stories non finies. Donner 4 points à la story de 8 points du sprint 5 aurait affiché 25 au lieu de 21, pour un travail que personne ne pouvait utiliser.</li>
      <li>Ré-estimer après coup. Une story estimée à 3 qui a pris deux fois plus de temps reste à 3, car la moyenne absorbe déjà ces écarts.</li>
    </ul>
    <p>Une vélocité qui baisse sur 2 ou 3 sprints est un bon sujet de <a href="/fr/retrospective">rétrospective</a> où l'équipe en cherche la cause.</p>

    <h2>La vélocité n'est pas dans le Guide Scrum 2020</h2>
    <p>Le Guide Scrum 2020 ne contient ni le mot vélocité, ni les story points, ni le poker planning. La pratique vient de l'Extreme Programming, à la fin des années 1990.</p>
    <p>Le Guide dit une chose proche à propos du Sprint Planning. Les développeurs prévoient mieux leur sprint quand ils connaissent leurs performances passées, leur capacité à venir et leur Definition of Done. La vélocité est une façon courante de chiffrer ces performances passées, parmi les méthodes d'<a href="/fr/estimation-agile">estimation agile</a>.</p>

    <h2>Questions fréquentes</h2>
    <h3>Comment calculer la vélocité d'une équipe Scrum&nbsp;?</h3>
    <p>L'équipe additionne les points des stories terminées à la fin de chaque sprint, puis fait la moyenne des 3 derniers sprints. Avec 24, 21 et 27 points, sa vélocité est de 24 points par sprint.</p>
    <h3>Quelle est une bonne vélocité en Scrum&nbsp;?</h3>
    <p>Aucun chiffre n'est bon ou mauvais, car la vélocité de deux équipes ne se compare pas. Une vélocité stable d'un sprint à l'autre donne des prévisions fiables.</p>
    <h3>La vélocité est-elle obligatoire en Scrum&nbsp;?</h3>
    <p>Non. Le Guide Scrum 2020 ne la mentionne pas, et chaque équipe choisit de la suivre ou non.</p>
    <h3>Quelle différence entre vélocité et capacité&nbsp;?</h3>
    <p>La vélocité compte les points terminés par sprint dans le passé. La capacité compte les jours de présence de l'équipe sur le sprint à venir. La première se corrige par la seconde quand des congés ou un jour férié réduisent la présence.</p>

    <div class="cta">
      <a href="/fr" class="btn">Estimer le prochain sprint en équipe</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/story-points">les story points</a>,
      <a href="/fr/points-de-complexite">les points de complexité</a>,
      <a href="/fr/sprint-planning">le Sprint Planning</a>,
      <a href="/fr/definition-of-done">la Definition of Done</a>,
      <a href="/fr/user-story">la user story</a>.
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
