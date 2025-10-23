import { ApiRecord, SourceId } from '../interfaces/interfaces';

export const MOCK_RESPONSES = [
  {
    id: 8811320,
    key: 'Hobit',
    title: 'Hobit',
    latest: {
      id: 1128484018,
      timestamp: '2022-12-20T10:25:57Z',
    },
    content_model: 'wikitext',
    license: {
      url: 'https://creativecommons.org/licenses/by-sa/4.0/deed.en',
      title: 'Creative Commons Attribution-Share Alike 4.0',
    },
    html_url: 'https://en.wikipedia.org/w/rest.php/v1/page/Hobit/html',
    redirect_target: '/w/rest.php/v1/page/Hobbit/bare?redirect=no',
  },
  {
    exhaustive: {
      nbHits: false,
      typo: true,
    },
    exhaustiveNbHits: false,
    exhaustiveTypo: true,
    hits: [
      {
        _highlightResult: {
          author: {
            matchLevel: 'none',
            matchedWords: [],
            value: 'kinlan',
          },
          story_text: {
            matchLevel: 'none',
            matchedWords: [],
            value: '',
          },
          title: {
            fullyHighlighted: false,
            matchLevel: 'full',
            matchedWords: ['hobit'],
            value:
              'Conquer the Lonely Mountain with <em>Hobit</em>s^H^H^H^HTML5',
          },
          url: {
            matchLevel: 'none',
            matchedWords: [],
            value:
              'http://chrome.blogspot.co.uk/2013/12/conquer-lonely-mountain-in-chrome.html',
          },
        },
        _tags: ['story', 'author_kinlan', 'story_6894975'],
        author: 'kinlan',
        created_at: '2013-12-12T15:40:01Z',
        created_at_i: 1386862801,
        num_comments: 0,
        objectID: '6894975',
        points: 1,
        story_id: 6894975,
        story_text: '',
        title: 'Conquer the Lonely Mountain with Hobits^H^H^H^HTML5',
        updated_at: '2023-09-06T22:52:57Z',
        url: 'http://chrome.blogspot.co.uk/2013/12/conquer-lonely-mountain-in-chrome.html',
      },
      {
        _highlightResult: {
          author: {
            matchLevel: 'none',
            matchedWords: [],
            value: 'Thorondor',
          },
          title: {
            fullyHighlighted: false,
            matchLevel: 'full',
            matchedWords: ['hobit'],
            value:
              'Planet Found in <em>Habit</em>able Zone Around Nearest Star',
          },
          url: {
            matchLevel: 'none',
            matchedWords: [],
            value: 'https://www.eso.org/public/news/eso1629/',
          },
        },
        _tags: ['story', 'author_Thorondor', 'story_12353441'],
        author: 'Thorondor',
        children: [12362156],
        created_at: '2016-08-24T17:00:44Z',
        created_at_i: 1472058044,
        num_comments: 427,
        objectID: '12353441',
        points: 1187,
        story_id: 12353441,
        title: 'Planet Found in Habitable Zone Around Nearest Star',
        updated_at: '2025-04-04T10:37:04Z',
        url: 'https://www.eso.org/public/news/eso1629/',
      },
    ],
  },
  {
    numFound: 13,
    start: 0,
    numFoundExact: true,
    num_found: 13,
    q: 'hobit',
    documentation_url: 'https://openlibrary.org/dev/docs/api/search',
    docs: [
      {
        author_name: ['J.R.R. Tolkien'],
        language: ['epo', 'ang', 'spa', 'jpn', 'lez', 'cor'],
        title: 'The Hobbit',
      },
      {
        author_name: ['Armine Harutʻyunyan'],
        language: ['arm'],
        title: 'Hobit',
      },
    ],
  },
  {
    total_count: 122,
    incomplete_results: false,
    items: [
      {
        id: 269955608,
        node_id: 'MDEwOlJlcG9zaXRvcnkyNjk5NTU2MDg=',
        name: 'HOBIT',
        full_name: 'Harmonic-Oscillator-hyBrid-fIT/HOBIT',
        private: false,
        owner: {
          login: 'Harmonic-Oscillator-hyBrid-fIT',
          id: 66516764,
          node_id: 'MDQ6VXNlcjY2NTE2NzY0',
          avatar_url: 'https://avatars.githubusercontent.com/u/66516764?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT',
          html_url: 'https://github.com/Harmonic-Oscillator-hyBrid-fIT',
          followers_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/followers',
          following_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/following{/other_user}',
          gists_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/subscriptions',
          organizations_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/orgs',
          repos_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/repos',
          events_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/Harmonic-Oscillator-hyBrid-fIT/received_events',
          type: 'User',
          user_view_type: 'public',
          site_admin: false,
        },
        html_url: 'https://github.com/Harmonic-Oscillator-hyBrid-fIT/HOBIT',
        description: 'Python library for fitting the harmonic oscillator',
        fork: false,
        url: 'https://api.github.com/repos/Harmonic-Oscillator-hyBrid-fIT/HOBIT',
        homepage: null,
        size: 1465,
        stargazers_count: 16,
        watchers_count: 16,
        language: 'Jupyter Notebook',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: true,
        has_pages: false,
        has_discussions: false,
        forks_count: 6,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 0,
        license: null,
        allow_forking: true,
        is_template: false,
        web_commit_signoff_required: false,
        topics: [],
        visibility: 'public',
        forks: 6,
        open_issues: 0,
        watchers: 16,
        default_branch: 'master',
        score: 1,
      },
      {
        id: 888898473,
        node_id: 'R_kgDONPuDqQ',
        name: 'hoBIT-admin-frontend',
        full_name: 'kweb-hoBIT/hoBIT-admin-frontend',
        private: false,
        owner: {
          login: 'kweb-hoBIT',
          id: 187238055,
          node_id: 'O_kgDOCykGpw',
          avatar_url: 'https://avatars.githubusercontent.com/u/187238055?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/kweb-hoBIT',
          html_url: 'https://github.com/kweb-hoBIT',
          followers_url: 'https://api.github.com/users/kweb-hoBIT/followers',
          following_url:
            'https://api.github.com/users/kweb-hoBIT/following{/other_user}',
          gists_url: 'https://api.github.com/users/kweb-hoBIT/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/kweb-hoBIT/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/kweb-hoBIT/subscriptions',
          organizations_url: 'https://api.github.com/users/kweb-hoBIT/orgs',
          repos_url: 'https://api.github.com/users/kweb-hoBIT/repos',
          events_url:
            'https://api.github.com/users/kweb-hoBIT/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/kweb-hoBIT/received_events',
          type: 'Organization',
          user_view_type: 'public',
          site_admin: false,
        },
        html_url: 'https://github.com/kweb-hoBIT/hoBIT-admin-frontend',
        description: 'hobit-admin-view',
        fork: false,
        url: 'https://api.github.com/repos/kweb-hoBIT/hoBIT-admin-frontend',
        homepage: 'https://admin.hobit.kr',
        size: 1465,
        stargazers_count: 6,
        watchers_count: 6,
        language: 'TypeScript',
        has_issues: true,
        has_projects: true,
        has_downloads: true,
        has_wiki: false,
        has_pages: false,
        has_discussions: false,
        forks_count: 3,
        mirror_url: null,
        archived: false,
        disabled: false,
        open_issues_count: 1,
        license: {
          key: 'mit',
          name: 'MIT License',
          spdx_id: 'MIT',
          url: 'https://api.github.com/licenses/mit',
          node_id: 'MDc6TGljZW5zZTEz',
        },
        allow_forking: true,
        is_template: false,
        web_commit_signoff_required: false,
        topics: [],
        visibility: 'public',
        forks: 3,
        open_issues: 1,
        watchers: 0,
        default_branch: 'develop',
        score: 1,
      },
    ],
  },
];

export const PROCESSED_RESPONSES: ApiRecord[][] = [
  [
    {
      sourceId: SourceId.Wikipedia,
      score: 34,
      snippet: 'https://en.wikipedia.org/w/rest.php/v1/page/Hobit/html',
      title: 'Hobit',
    },
  ],
  [
    {
      sourceId: SourceId.HackerNews,
      score: 1,
      snippet: 'kinlan',
      title: 'Conquer the Lonely Mountain with Hobits^H^H^H^HTML5',
    },
    {
      sourceId: SourceId.HackerNews,
      score: 1187,
      snippet: 'Thorondor',
      title: 'Planet Found in Habitable Zone Around Nearest Star',
    },
  ],
  [
    {
      sourceId: SourceId.OpenLibrary,
      score: 6,
      snippet: 'J.R.R. Tolkien',
      title: 'The Hobbit',
    },
    {
      sourceId: SourceId.OpenLibrary,
      score: 1,
      snippet: 'Armine Harutʻyunyan',
      title: 'Hobit',
    },
  ],
  [
    {
      sourceId: SourceId.GitHub,
      score: 16,
      snippet: 'Python library for fitting the harmonic oscillator',
      title: 'HOBIT',
    },
    {
      sourceId: SourceId.GitHub,
      score: 6,
      snippet: 'hobit-admin-view',
      title: 'hoBIT-admin-frontend',
    },
  ],
];

export const STRNGIFIED_HACKER_JSON =
  '{\n  "HackerNews": [\n    {\n      "sourceId": "HackerNews",\n      "score": 1187,\n      "snippet": "Thorondor",\n      "title": "Planet Found in Habitable Zone Around Nearest Star"\n    }\n  ]\n}';

export const STRNGIFIED_ALL_JSON =
  '{\n  "Wikipedia": [\n    {\n      "sourceId": "Wikipedia",\n      "score": 34,\n      "snippet": "https://en.wikipedia.org/w/rest.php/v1/page/Hobit/html",\n      "title": "Hobit"\n    }\n  ],\n  "HackerNews": [\n    {\n      "sourceId": "HackerNews",\n      "score": 1,\n      "snippet": "kinlan",\n      "title": "Conquer the Lonely Mountain with Hobits^H^H^H^HTML5"\n    },\n    {\n      "sourceId": "HackerNews",\n      "score": 1187,\n      "snippet": "Thorondor",\n      "title": "Planet Found in Habitable Zone Around Nearest Star"\n    }\n  ]\n}';
