<svelte:head>
  <title>Definition of Done (DoD)&nbsp;: définition, exemple, Definition of Ready | PokerAgile</title>
  <meta name="description" content="Definition of Done en Scrum&nbsp;: définition du Guide Scrum 2020, exemple en 9 critères, différence avec les critères d'acceptation et la Definition of Ready." />
  <link rel="canonical" href="https://pokeragile.com/fr/definition-of-done" />
  <link rel="alternate" hreflang="fr" href="https://pokeragile.com/fr/definition-of-done" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Definition of Done (DoD) : définition, exemple et différence avec la Definition of Ready',
    url: 'https://pokeragile.com/fr/definition-of-done',
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
        name: 'Qui écrit la Definition of Done ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La Scrum Team. Selon le Guide Scrum 2020, si l\'organisation impose déjà une Definition of Done, toutes les équipes la suivent comme un minimum. Sinon, la Scrum Team crée celle qui convient à son produit.' },
      },
      {
        '@type': 'Question',
        name: 'Comment dit-on Definition of Done en français ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Définition de fini, ou définition de terminé. Les équipes françaises gardent le plus souvent le terme anglais et le sigle DoD.' },
      },
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre Definition of Done et Definition of Ready ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La Definition of Done dit quand un travail est terminé, la Definition of Ready dit quand une story peut entrer dans un sprint.' },
      },
      {
        '@type': 'Question',
        name: 'Une story presque finie compte-t-elle dans la vélocité ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non, selon l\'usage courant. Le Guide Scrum ne parle pas de vélocité : il dit seulement qu\'un élément non conforme retourne au Product Backlog. Les équipes qui comptent des points lui donnent zéro, puis comptent ses points dans le sprint où il est terminé.' },
      },
    ],
  })}<\/script>`}
</svelte:head>

<div class="page container">
  <main id="main">
    <a href="/fr/planning-poker" class="back-link">Guide du poker planning</a>

    <h1>Definition of Done (DoD)&nbsp;: définition, exemple et différence avec la Definition of Ready</h1>

    <p class="lead">
      La Definition of Done (DoD, «&nbsp;définition de fini&nbsp;» en français) est la liste des conditions qu'un travail doit remplir pour être déclaré terminé. Dans Scrum, un élément qui ne la respecte pas ne peut être ni livré, ni présenté à la Sprint Review.
    </p>

    <h2>Exemple de Definition of Done&nbsp;: 9 critères à copier pour une équipe web</h2>
    <p>Voici la DoD de l'équipe d'une boutique en ligne&nbsp;: Léa, Karim et trois autres développeurs, en sprints de 2 semaines. Elle sert de modèle à adapter.</p>
    <ol>
      <li>Le code est relu et approuvé par une autre personne de l'équipe.</li>
      <li>Des tests automatisés couvrent le nouveau comportement, et tous passent.</li>
      <li>L'intégration continue est verte sur la branche principale.</li>
      <li>Les critères d'acceptation de la story sont vérifiés un par un.</li>
      <li>Tout écran modifié fonctionne sur mobile et sur les deux dernières versions de Chrome, Firefox et Safari.</li>
      <li>Tout écran modifié se parcourt au clavier et atteint le niveau AA des WCAG (règles d'accessibilité du web).</li>
      <li>Aucun bug connu ne reste ouvert sur la story.</li>
      <li>La documentation et le journal des changements sont à jour.</li>
      <li>La story est déployée en préproduction, où toute l'équipe peut la tester.</li>
    </ol>
    <p>Chaque ligne se vérifie par oui ou par non. «&nbsp;Le code est propre&nbsp;» ne se vérifie pas. «&nbsp;Le code est relu par une autre personne&nbsp;» se vérifie en dix secondes.</p>

    <h2>Le Guide Scrum 2020 fait de la Definition of Done l'engagement de l'Increment</h2>
    <p>Dans le <a href="https://scrumguides.org/scrum-guide.html" rel="noopener noreferrer">Guide Scrum 2020</a>, chaque artefact porte un engagement&nbsp;: le Product Goal pour le Product Backlog, le Sprint Goal pour le Sprint Backlog, la Definition of Done pour l'Increment. Elle décrit l'état de l'Increment quand il atteint la qualité exigée pour le produit.</p>
    <ul>
      <li>Un Increment naît au moment où un élément du Product Backlog respecte la Definition of Done.</li>
      <li>Un élément qui ne la respecte pas ne peut pas être présenté à la Sprint Review. Il retourne au Product Backlog.</li>
      <li>Plusieurs Scrum Teams qui travaillent sur le même produit partagent la même Definition of Done.</li>
    </ul>

    <h2>Definition of Done et critères d'acceptation&nbsp;: la DoD vaut pour toutes les stories</h2>
    <p>Les critères d'acceptation décrivent ce qu'une <a href="/fr/user-story">user story</a> précise doit faire. La DoD décrit la qualité commune à toutes. Le Guide Scrum ne cite pas les critères d'acceptation&nbsp;: ils viennent de la pratique des user stories.</p>
    <div class="table-wrap">
    <table>
      <thead><tr><th></th><th>Definition of Done</th><th>Critères d'acceptation</th></tr></thead>
      <tbody>
        <tr><td>Portée</td><td>Toutes les stories de l'équipe</td><td>Une seule story</td></tr>
        <tr><td>Contenu</td><td>La qualité&nbsp;: revue, tests, déploiement</td><td>Le comportement attendu par l'utilisateur</td></tr>
        <tr><td>Auteur (usage courant)</td><td>La Scrum Team</td><td>Le Product Owner, avec l'équipe</td></tr>
        <tr><td>Durée de vie</td><td>Stable, revue en rétrospective</td><td>Écrits pour une story, puis archivés avec elle</td></tr>
        <tr><td>Exemple</td><td>«&nbsp;Le code est relu par une autre personne&nbsp;»</td><td>«&nbsp;Le fichier CSV contient une ligne par commande&nbsp;»</td></tr>
        <tr><td>Dans le Guide Scrum</td><td>Oui</td><td>Non</td></tr>
      </tbody>
    </table>
    </div>
    <p>Une story est terminée quand elle remplit les deux. Dans l'exemple, le critère 4 de la DoD fait le lien.</p>

    <h2>Definition of Done vs Definition of Ready&nbsp;: la seconde n'est pas dans le Guide Scrum</h2>
    <p>La Definition of Ready (DoR) est la liste des conditions qu'une story doit remplir avant d'entrer dans un sprint.</p>
    <p>Le Guide Scrum 2020 ne contient aucune Definition of Ready. Il dit seulement qu'un élément que l'équipe peut terminer en un sprint est prêt à être choisi au <a href="/fr/sprint-planning">Sprint Planning</a>.</p>
    <p>Appliquée comme un contrat, une DoR a trois risques.</p>
    <ul>
      <li>Elle devient un guichet&nbsp;: l'équipe refuse une story utile parce qu'une case manque.</li>
      <li>Elle pousse à tout spécifier avant le sprint, comme dans un cycle en V.</li>
      <li>Elle remplace la discussion entre le Product Owner et les développeurs par un formulaire.</li>
    </ul>

    <h2>Une heure d'atelier suffit pour écrire la Definition of Done en équipe</h2>
    <p>L'équipe de la boutique a écrit la sienne en une heure, avec le Product Owner et le Scrum Master.</p>
    <ol>
      <li>Chacun note sur des papiers ce qu'il vérifie déjà avant de dire «&nbsp;c'est fini&nbsp;».</li>
      <li>L'équipe regroupe les papiers et retire les doublons.</li>
      <li>Elle garde les critères qu'elle sait tenir dès le prochain sprint, et reformule chacun en oui ou non.</li>
      <li>Les critères hors d'atteinte vont dans une liste d'attente. Chez elle&nbsp;: le test de charge.</li>
    </ol>

    <h2>Au poker planning, la carte compte tout le travail de la Definition of Done</h2>
    <p>Une estimation porte sur une story terminée, donc conforme à la DoD. Les tests, la revue de code et le déploiement en préproduction entrent dans la carte. Les story points et le <a href="/fr/planning-poker">poker planning</a> (ou planning poker) ne figurent pas dans le Guide Scrum&nbsp;: ce sont des usages d'équipe.</p>
    <p>Au début du sprint 12, l'équipe estime la story «&nbsp;exporter les commandes en CSV&nbsp;». Une personne <a href="/fr">crée une salle</a> sur PokerAgile, l'outil gratuit de poker planning de ce site, et chacun vote en secret. Karim pose 3, Léa pose 8.</p>
    <p>Karim a compté le code de l'export. Léa a ajouté la revue, les tests automatisés, la documentation et le déploiement en préproduction, soit les critères 1, 2, 8 et 9. Après discussion, l'équipe revote et retient 5 <a href="/fr/story-points">story points</a>.</p>
    <p>Une équipe qui relit sa DoD avant de voter réduit ces écarts. Ceux qui restent viennent de la story, et plus d'une idée différente du mot «&nbsp;fini&nbsp;».</p>

    <h2>La rétrospective fait évoluer la Definition of Done</h2>
    <p>Le Guide Scrum cite la Definition of Done parmi les sujets que l'équipe inspecte en Sprint Retrospective.</p>
    <p>Suite du sprint 12&nbsp;: l'export CSV respecte les 9 critères et part en production. Le lendemain, un client ouvre le fichier dans un tableur, et les accents sont illisibles. Aucun critère ne couvrait ce cas.</p>
    <p>En <a href="/fr/retrospective">rétrospective</a>, l'équipe ajoute un dixième critère&nbsp;: «&nbsp;tout fichier exporté est ouvert dans un tableur avant la revue&nbsp;».</p>

    <h2>Quatre erreurs fréquentes avec la Definition of Done</h2>
    <ul>
      <li>Des critères vagues, comme «&nbsp;le code est de qualité&nbsp;», que personne ne peut cocher.</li>
      <li>Une DoD écrite par un manager seul, que l'équipe ne se sent pas tenue de suivre.</li>
      <li>Une story «&nbsp;finie à 90&nbsp;%&nbsp;» montrée quand même à la Sprint Review. Le Guide Scrum l'interdit.</li>
      <li>Une DoD assouplie en fin de sprint pour finir à temps. Les tests sautés reviennent en bugs dans les sprints suivants.</li>
    </ul>

    <h2>Questions fréquentes</h2>
    <h3>Qui écrit la Definition of Done&nbsp;?</h3>
    <p>La Scrum Team. Selon le Guide Scrum 2020, si l'organisation impose déjà une Definition of Done, toutes les équipes la suivent comme un minimum. Sinon, la Scrum Team crée celle qui convient à son produit.</p>
    <h3>Comment dit-on Definition of Done en français&nbsp;?</h3>
    <p>Définition de fini, ou définition de terminé. Les équipes françaises gardent le plus souvent le terme anglais et le sigle DoD.</p>
    <h3>Quelle est la différence entre Definition of Done et Definition of Ready&nbsp;?</h3>
    <p>La Definition of Done dit quand un travail est terminé, la Definition of Ready dit quand une story peut entrer dans un sprint.</p>
    <h3>Une story presque finie compte-t-elle dans la vélocité&nbsp;?</h3>
    <p>Non, selon l'usage courant. Le Guide Scrum ne parle pas de <a href="/fr/velocite">vélocité</a>&nbsp;: il dit seulement qu'un élément non conforme retourne au Product Backlog. Les équipes qui comptent des points lui donnent zéro, puis comptent ses points dans le sprint où il est terminé.</p>

    <div class="cta">
      <a href="/fr" class="btn">Estimer une story avec votre équipe</a>
    </div>

    <p class="related">
      À lire aussi&nbsp;:
      <a href="/fr/planning-poker">le guide du poker planning</a>,
      <a href="/fr/user-story">la user story</a>,
      <a href="/fr/velocite">la vélocité</a>,
      <a href="/fr/sprint-planning">le Sprint Planning</a>,
      <a href="/fr/points-de-complexite">les points de complexité</a>,
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
