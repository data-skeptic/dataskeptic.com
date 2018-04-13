const express = require('express')

const axios = require('axios')

const c = require('../../../config/config.json')
const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
const base_api = c[env]['base_api'] + env

const MOCKED_LIST = [
  {
    title: 'The Theory of Formal Languages',
    desc:
      '<p>In this episode, Kyle and Linhda discuss the theory of formal languages. Any language can (theoretically) be a formal language. The requirement is that the language can be rigorously described as a set of strings which are considered part of the language. Those strings are any combination of alphabet characters in the given language.</p> <p><a href= "https://dataskeptic.com/blog/episodes/2018/the-theory-of-formal-languages"> Read more</a></p> <p>Â </p>',
    pubDate: '2018-04-06T15:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/the-theory-of-formal-languages.mp3?dest-id=201630',
    duration: '23:44',
    img:
      'https://static.libsyn.com/p/assets/e/7/e/7/e7e713ec4440d4ba/ds-couch-mini-400.png',
    guid: '6ca2078ef6372c38ab8ce64b06979c7f',
    link:
      'https://dataskeptic.com/blog/episodes/2018/the-theory-of-formal-languages',
    num: 208
  },
  {
    title: 'The Loebner Prize',
    desc:
      '<p>The Loebner Prize is a competition in the spirit of the Turing Test.Â  Participants are welcome to submit conversational agent software to be judged by a panel of humans.Â  This episode includes interviews with Charlie Maloney, a judge in the Loebner Prize, and Bruce Wilcox, a winner of the Loebner Prize.</p>',
    pubDate: '2018-03-30T15:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/the-loebner-prize.mp3?dest-id=201630',
    duration: '33:21',
    img:
      'https://static.libsyn.com/p/assets/b/5/c/d/b5cd8ab97ed0c63c/DS-PodcastCover-R2.png',
    guid: 'f653672b5cae36cd46e75f3fea1cd6db',
    link: 'https://dataskeptic.com/blog/episodes/2018/the-loebner-prize',
    num: 207,
    blog_id: 359,
    author: 'Kyle',
    abstract:
      "In this episode, we focus on the Loebner Prize competition and explore the question of what it means to sound human in conversations. Our host Kyle Polich talks to Bruce Wilcox, a veteran Loebner Prize participant, and Charlie Moloney, a former judge from the 2017 competition. Both Bruce and Charlie were at last year's Loebner Prize competition, and they each share their stories and experiences from either the judge's perspective or chatbot creator's perspective. Bruce, who is a four-time winner of the Loebner tournament, shares his ideas behind the chatbot engine he developed, called ChatScript, as well as what makes a good conversational agent. In addition, we hear from Charlie about what it's like to judge text conversations with humans and computer programs, and whether judges could ever be fooled into thinking a computer is human.\n\n",
    publish_date: '2018-03-30T15:41:17.000Z',
    prettyname: '/episodes/2018/the-loebner-prize',
    src_file: 'episodes/2018/the-loebner-prize.htm',
    related: [
      {
        content_id: 132,
        blog_id: 359,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/charlie-moloney.jpg',
        type: 'person',
        title: 'Charlie Moloney',
        body:
          'Charlie Moloney is a multimedia journalist and Managing Editor at aiweek.io, where he writes mainly about artificial intelligence and its applications to business and everyday life. Prior to aiweek.io, he was an editor and reporter at Access AI, an online resource for new and content about machine learning. In 2017, Charlie was honored to be one of the four judges at the Loebner Prize.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 133,
        blog_id: 359,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/bruce-wilcox.jpg',
        type: 'person',
        title: 'Bruce Wilcox',
        body:
          'Bruce Wilcox is the director of natural language strategy for JustAnswer and a four-time winner of the Loebner Prize. He developed ChatScript, a popular and well-regarded open-source Natural Language platform and dialog management system for creating chatbots. Prior to focusing on chatbots, Bruce worked and consulted for various video game companies on their game AI and user interfaces. ',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 134,
        blog_id: 359,
        dest:
          'https://chatbotsmagazine.com/how-to-win-a-turing-test-the-loebner-prize-3ac2752250f1',
        type: 'external-link',
        title: 'How to win a Turing Test (the Loebner Prize)',
        body:
          'Article by Charlie Moloney about his experience judging for the 2017 Loebner Prize competition.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 135,
        blog_id: 359,
        dest: 'https://github.com/bwilcox-1234/ChatScript',
        type: 'external-link',
        title: 'ChatScript',
        body: 'Natural language tool/dialog manager developed by Bruce Wilcox.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 136,
        blog_id: 359,
        dest:
          'http://ec2-54-215-197-164.us-west-1.compute.amazonaws.com/speech.php',
        type: 'external-link',
        title: 'Talk to Rose',
        body:
          "Bruce Wilcox's chatbot Rose is available right now for conversation via the web.  Chat with her via this link.",
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'Chatbots',
    desc:
      '<p>In this episode, Kyle chats with Vince from <a href= "https://iv.ai/">iv.ai</a> and Heather Shapiro who works on the <a href="https://dev.botframework.com/">Microsoft Bot Framework</a>. We solicit their advice on building a good chatbot both creatively and technically.</p> <p>Our sponsor today is <a href="http://warbyparker.com/data">Warby Parker</a>.</p>',
    pubDate: '2018-03-23T15:00:00.000Z',
    mp3: 'https://traffic.libsyn.com/dataskeptic/chatbots.mp3?dest-id=201630',
    duration: '27:05',
    img:
      'https://static.libsyn.com/p/assets/0/7/5/d/075daebaccc96e80/DS-PodcastCover-R2.png',
    guid: 'cada69954898d18af4db5e0dbe69bb75',
    link: 'https://dataskeptic.com/blog/episodes/2018/chatbots',
    num: 206,
    blog_id: 355,
    author: 'Kyle',
    abstract:
      'Kyle talks to Heather and Vince about Chatbots and announces the chatbot for dataskeptic',
    publish_date: '2018-03-23T15:05:03.000Z',
    prettyname: '/episodes/2018/chatbots',
    src_file: 'episodes/2018/chat-bots.htm',
    related: [
      {
        content_id: 128,
        blog_id: 355,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/vince-lynch.jpg',
        type: 'person',
        title: 'Vince Lynch',
        body:
          'VinceÂ Lynch isÂ CEO of IV Inc owner ofÂ IV.AIÂ the artificial intelligence agency.Â He is the host of the AI Review podcast on iTunes and writes articles on machine learning for The Observer, Entrepreneur, and HuffPo. LynchÂ previouslyÂ worked with Spotify, The Times of India, Dumbstruck,Â and Virgin.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 129,
        blog_id: 355,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/heather-shapiro.jpg',
        type: 'person',
        title: 'Heather Shapiro',
        body:
          'Heather Shapiro is a Program Manager for Microsoft in Cambridge, MA working on User Experience for the Azure Machine Learning Workbench application. She received her B.S. in Computer Science and Statistical Science from Duke University. Prior to her current role at Microsoft, she was a technical evangelist for the company.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'The Master Algorithm',
    desc:
      '<p>In this weekâ€™s episode, Kyle Polich interviews Pedro Domingos about his book,Â <em>The Master Algorithm: How the quest for the ultimate learning machine will remake our world</em>. In the book, Domingos describes what machine learning is doing for humanity, how it works and what it could do in the future. He also hints at the possibility of an ultimate learning algorithm, in which the machine uses it will be able to derive all knowledge â€” past, present, and future.</p>',
    pubDate: '2018-03-16T15:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/the-master-algorithm.mp3?dest-id=201630',
    duration: '46:34',
    img:
      'https://static.libsyn.com/p/assets/8/7/c/f/87cf646105ad740b/DS-PodcastCover-R2.png',
    guid: 'a1e02bb891dcbcd7074004e7e040dbe6',
    link: 'https://dataskeptic.com/blog/episodes/2018/the-master-algorithm',
    num: 205,
    blog_id: 353,
    author: 'Kyle',
    abstract:
      'In this weekâ€™s episode, Kyle Polich interviews Pedro Domingos about his book, The Master Algorithm: How the quest for the ultimate learning machine will remake our world. In the book, Domingos describes what machine learning is doing for humanity, how it works and what it could do in the future. He also hints at the possibility of an ultimate learning algorithm, in which the machine uses it will be able to derive all knowledge â€” past, present, and future.',
    publish_date: '2018-03-16T15:06:10.000Z',
    prettyname: '/episodes/2018/the-master-algorithm',
    src_file: 'episodes/2018/the-master-algorithm.htm',
    related: [
      {
        content_id: 120,
        blog_id: 353,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/pedro-domingos.jpg',
        type: 'person',
        title: 'Pedro Domingos',
        body:
          'Pedro Domingos is a professor of computer science at the University of Washington and the author of "The Master Algorithm."  He is the winner of the SIGKDD Innovation Award--the highest honor in data science--and a fellow of the Association for the Advancement of Artificial Intelligence. Pedro received his Ph.D. from the University of California at Irvine and his B.S. and M.S. in Electrical Engineering and Computer Science from Instituto Superior TÃ©cnico (IST), in Lisbon. He co-founded the International Machine Learning Society in 2001 and has held visiting positions at Stanford, Carnegie Mellon, and MIT. Pedroâ€™s research interests span a wide variety of topics, including scaling learning algorithms to big data, maximizing word of mouth in social networks, unifying logic and probability and deep learning.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 121,
        blog_id: 353,
        dest: 'https://www.coursera.org/specializations/machine-learning',
        type: 'external-link',
        title: 'Machine Learning',
        body: 'Machine Learning course on Coursera',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 122,
        blog_id: 353,
        dest:
          'https://www.amazon.com/Master-Algorithm-Ultimate-Learning-Machine/dp/0465065708/',
        type: 'external-link',
        title:
          'The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World',
        body: 'A book by Pedro Domingos',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 123,
        blog_id: 353,
        dest: 'https://alchemy.cs.washington.edu/',
        type: 'external-link',
        title: 'Alchemy: Open Source AI',
        body:
          'Alchemy is a software package providing a series of algorithms for statistical relational learning and probabilistic logic inference, based on the Markov logic representation.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'The No Free Lunch Theorems',
    desc:
      "<p>What's the best machine learning algorithm to use? I hear that XGBoost wins most of the Kaggle competitions that aren't won with deep learning. Should I just use XGBoost all the time? That might work out most of the time in practice, but a proof exists which tells us that there cannot be one true algorithm to rule them.</p>",
    pubDate: '2018-03-09T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/no-free-lunch-theorems.mp3?dest-id=201630',
    duration: '27:25',
    img:
      'https://static.libsyn.com/p/assets/d/6/2/e/d62e1f38b348c7a2/ds-couch-mini-400.png',
    guid: '607bfc3cac46840ee599aa9c5cf52e7a',
    link:
      'https://dataskeptic.com/blog/episodes/2018/the-no-free-lunch-theorems',
    num: 204,
    blog_id: 351,
    author: 'Kyle',
    abstract:
      "What's the best machine learning algorithm to use?  I hear that XGBoost wins most of the Kaggle competitions that aren't won with deep learning.  Should I just use XGBoost all the time?  That might work out most of the time in practice, but a proof exists which tells us that there cannot be one true algorithm to rule them.",
    publish_date: '2018-03-09T00:00:00.000Z',
    prettyname: '/episodes/2018/the-no-free-lunch-theorems',
    src_file: 'episodes/2018/no-free-lunch-theorems.htm',
    related: [],
    contributors: [
      {
        blog_id: 351,
        contributor_id: 1,
        contribution: 'Host',
        sort_order: 0,
        prettyname: 'Kyle Polich',
        img:
          'https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.jpg',
        twitter: 'dataskeptic',
        linkedin: 'https://www.linkedin.com/in/kyle-polich-5047193',
        bio:
          'Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.',
        author: 'kyle'
      },
      {
        blog_id: 351,
        contributor_id: 2,
        contribution: 'Co-host',
        sort_order: 1,
        prettyname: 'Linh Da Tran',
        img:
          'https://s3.amazonaws.com/dataskeptic.com/contributors/linh-da-tran.jpg',
        twitter: '',
        linkedin: '',
        bio:
          'Originally from North Carolina, Linhda graduated undergrad from UNC-Chapel Hill (Tarheels!) and promptly moved to the Golden Coast when she heard of sunnier days, fewer mosquitos and a long coastline of beaches.  When she is not on the podcast, she enjoys commuting to work via bike, spending time with Yoshi, cooking then eating, lots of sleep and occasional yoga and making small-batch artisan ice cream.  Her short stature and below average bike size has deterred many a LA bike thieves-- evidence that it pay off to be short.',
        author: 'linhda'
      }
    ]
  },
  {
    title: 'ML at Sloan Kettering Cancer Center',
    desc:
      "<p>For a long time, physicians have recognized that the tools they have aren't powerful enough to treat complex diseases, like cancer. In addition to data science and models, clinicians also needed actual products â€” tools that physicians and researchers can draw upon to answer questions they regularly confront, such as â€œwhat clinical trials are available for this patient that I'm seeing right now?â€ In this episode, our host Kyle interviews guests Alex Grigorenko and Iker Huerga from Memorial Sloan Kettering Cancer Center to talk about how data and technology can be used to prevent, control and ultimately cure cancer.</p>",
    pubDate: '2018-03-02T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/ml-at-sloan-kettering-cancer-center.mp3?dest-id=201630',
    duration: '38:34',
    img:
      'https://static.libsyn.com/p/assets/5/3/9/a/539ae2d299add4fd/DS-PodcastCover-R2.png',
    guid: '53ecfef2f365d114f64f311b7232cec2',
    link:
      'https://dataskeptic.com/blog/episodes/2018/ml-at-sloan-kettering-cancer-center',
    num: 203,
    blog_id: 348,
    author: 'Kyle',
    abstract:
      "For a long time, physicians have recognized that the tools they have aren't powerful enough to treat complex diseases, like cancer. In addition to data science and models, clinicians also needed actual products â€” tools that physicians and researchers can draw upon to answer questions they regularly confront, such as â€œwhat clinical trials are available for this patient that I'm seeing right now?â€ In this episode, our host Kyle interviews guests Alex Grigorenko and Iker Huerga from Memorial Sloan Kettering Cancer Center to talk about how data and technology can be used to prevent, control and ultimately cure cancer.",
    publish_date: '2018-03-02T00:00:00.000Z',
    prettyname: '/episodes/2018/ml-at-sloan-kettering-cancer-center',
    src_file: 'episodes/2018/ml-at-sloan-kettering-cancer-center.htm',
    related: [
      {
        content_id: 114,
        blog_id: 348,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/iker-huerga.jpg',
        type: 'person',
        title: 'Iker Huerga',
        body:
          'Iker Huerga is the Director of Engineering and Applied Machine Learning at Memorial Sloan Kettering, where he leads a multidisciplinary team called MSK Data Products. Iker holds an M.Sc. in Computer Science and Electrical Engineering from Mondragon University in Spain. Prior to MSK, Iker has worked in academia and has founded two biotech companies that leverage machine learning and big data to support translational healthcare.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 115,
        blog_id: 348,
        dest: 'https://www.kaggle.com/c/msk-redefining-cancer-treatment',
        type: 'external-link',
        title: 'Personalized Medicine: Redefining Cancer Treatment ',
        body:
          'A competition to predict the effect of Genetic Variants to enable Personalized Medicine.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 117,
        blog_id: 348,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/alex-grigorenko.jpeg',
        type: 'person',
        title: 'Alex Grigorenko',
        body:
          'Alex Grigorenko is the lead data scientist of the Data Products Team, a multidisciplinary software development team of designers, engineers and data scientists, at Memorial Sloan Kettering (MSK). Prior to that, he worked as a statistical analyst on MSKâ€™s Strategic Initiatives and Quantitative Analysis Team. Alex holds an M.S. in Biostatistics from Harvard Universityâ€™s School of Public Health and a B.S. in mathematical decision sciences from the University of North Carolina, Chapel Hill.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'Optimal Decision Making with POMDPs',
    desc:
      '<p>In a previous episode, we discussed Markov Decision Processes or MDPs, a framework for decision making and planning. This episode explores the generalization Partially Observable MDPs (POMDPs) which are an incredibly general framework that describes most every agent based system.</p>',
    pubDate: '2018-02-23T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/optimal-decision-making-with-pomdps.mp3?dest-id=201630',
    duration: '18:40',
    img:
      'https://static.libsyn.com/p/assets/8/2/c/2/82c23ef60973ffe9/ds-couch-mini-400.png',
    guid: '6f7d91e359c7fc9aac5b198770ad219a',
    link:
      'https://dataskeptic.com/blog/episodes/2018/optimal-decision-making-with-pomdps',
    num: 202,
    blog_id: 346,
    author: 'Kyle',
    abstract:
      'In a previous episode, we discussed Markov Decision Processes or MDPs, a framework for decision making and planning.  This episode explores the generalization Partially Observable MDPs (POMDPs) which are an incredibly general framework that describes most every agent based system.',
    publish_date: '2018-02-23T00:00:00.000Z',
    prettyname: '/episodes/2018/optimal-decision-making-with-pomdps',
    src_file: 'episodes/2018/optimal-decision-making-with-pomdps.htm',
    related: [],
    contributors: []
  },
  {
    title: 'AI Decision Making',
    desc:
      "<p>Making a decision is a complex task. Today's guest Dongho Kim discusses how he and his team at Prowler has been building a platform that will be accessible by way of APIs and a set of pre-made scripts for autonomous decision making based on probabilistic modeling, reinforcement learning, and game theory. The aim is so that an AI system could make decisions just as good as humans can.</p>",
    pubDate: '2018-02-16T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/ai-decision-making.mp3?dest-id=201630',
    duration: '42:59',
    img:
      'https://static.libsyn.com/p/assets/a/5/8/3/a58322fffef2cbf2/DS-PodcastCover-R2.png',
    guid: '44f42f6e6776163ffa0ae226ae66c9eb',
    link: 'https://dataskeptic.com/blog/episodes/2018/ai-decision-making',
    num: 201,
    blog_id: 344,
    author: 'Kyle',
    abstract:
      "Making a decision is a complex task. Today's guest Dongho Kim discusses how he and his team at Prowler has been building a platform that will be accessible by way of APIs and a set of pre-made scripts for autonomous decision making based on probabilistic modeling, reinforcement learning, and game theory. The aim is so that an AI system could make decisions just as good as humans can.Â At the moment Prowler is focusing on multi-agent systems for the video game industry, smart city applications and stock trading or portfolio optimizat",
    publish_date: '2018-02-16T00:00:00.000Z',
    prettyname: '/episodes/2018/ai-decision-making',
    src_file: 'episodes/2018/ai-decision-making.htm',
    related: [
      {
        content_id: 109,
        blog_id: 344,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/dongho-kim.jpg',
        type: 'person',
        title: 'Dongho Kim',
        body:
          'Dongho Kim received his PhD in Computer Science from the Korea Advanced Institute of Science and Technology in South Korea in 2010. After that, he was a post-doctoral research associate at Cambridge Universityâ€™s Department of Engineering and a machine learning engineer at Apple, Inc. Currently, Dongho is the co-founder and CTO of PROWLER.io. His research interests are in reinforcement learning, POMDP, and statistical dialog systems.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 110,
        blog_id: 344,
        dest: 'https://prowler.io',
        type: 'external-link',
        title: 'Prowler.io',
        body: '',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'Reinforcement Learning',
    desc:
      "<p>In many real world situations, a person/agent doesn't necessarily know their own objectives or the mechanics of the world they're interacting with. However, if the agent receives rewards which are correlated with the both their actions and the state of the world, then reinforcement learning can be used to discover behaviors that maximize the reward earned.</p>",
    pubDate: '2018-02-09T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/reinforcement-learning.mp3?dest-id=201630',
    duration: '23:03',
    img:
      'https://static.libsyn.com/p/assets/f/b/f/f/fbffd6eb93dd69f0/ds-couch-mini-400.png',
    guid: 'f8946083c7765a945920e2a56db49f4c',
    link: 'https://dataskeptic.com/blog/episodes/2018/reinforcement-learning',
    num: 200,
    blog_id: 341,
    author: 'Kyle',
    abstract:
      "In many real world situations, a person/agent doesn't necessarily know their own objectives or the mechanics of the world they're interacting with.  However, if the agent receives rewards which are correlated with the both their actions and the state of the world, then reinforcement learning can be used to discover behaviors that maximize the reward earned.\n",
    publish_date: '2018-02-08T00:00:00.000Z',
    prettyname: '/episodes/2018/reinforcement-learning',
    src_file: 'episodes/2018/reinforcement-learning.htm',
    related: [],
    contributors: []
  },
  {
    title: 'Evolutionary Computation',
    desc:
      '<p>In this weekâ€™s episode, Kyle is joined by Risto Miikkulainen, a professor of computer science and neuroscience at the University of Texas at Austin. They talk about evolutionary computation, its applications in deep learning, and how itâ€™s inspired by biology. They also discuss some of the things Sentient Technologies is working on in stock and finances, retail, e-commerce and web design, as well as the technology behind it-- evolutionary algorithms.</p>',
    pubDate: '2018-02-02T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/evolutionary-computation.mp3?dest-id=201630',
    duration: '24:44',
    img:
      'https://static.libsyn.com/p/assets/4/b/b/5/4bb528f3358cbf69/DS-PodcastCover-R2.png',
    guid: '1b97492aaad0bc3ca0f32e7e8fd75488',
    link: 'https://dataskeptic.com/blog/episodes/2018/evolutionary-computation',
    num: 199,
    blog_id: 334,
    author: 'Kyle',
    abstract:
      'In this weekâ€™s episode, Kyle is joined by Risto Miikkulainen, a professor of computer science and neuroscience at the University of Texas at Austin. They talk about evolutionary computation, its applications in deep learning, and how itâ€™s inspired by biology. They also discuss some of the things Sentient Technologies is working on in stock and finances, retail, e-commerce and web design, as well as the technology behind it-- evolutionary algorithms.',
    publish_date: '2018-02-02T00:00:00.000Z',
    prettyname: '/episodes/2018/evolutionary-computation',
    src_file: 'episodes/2018/evolutionary-computation.htm',
    related: [
      {
        content_id: 102,
        blog_id: 334,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/risto-miikkulainen.jpg',
        type: 'person',
        title: 'Risto Miikkulainen',
        body:
          'Risto Miikkulainen is a Professor of Computer Science at the University of Texas at Austin and VP of Research at Sentient Technologies, Inc. He received an M.S. in Engineering from the Helsinki University of Technology (now Aalto University) in 1986, and a Ph.D. in Computer Science from UCLA in 1990.  His current research focuses on methods and applications of neuroevolution, as well as neural network models of natural language processing and vision; he is an author of over 380 articles in these research areas. He is an IEEE Fellow; his work on neuroevolution has recently been recognized with the Gabor Award of the International Neural Network Society and Outstanding Paper of the Decade Award of the International Society for Artificial Life.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 103,
        blog_id: 334,
        dest: 'https://www.cs.utexas.edu/users/risto/',
        type: 'external-link',
        title: "Risto Miikkulainen's webpage at the University of Texas ",
        body: '',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 104,
        blog_id: 334,
        dest: 'http://nn.cs.utexas.edu/',
        type: 'external-link',
        title: 'UT Neural Networks Research Group',
        body: '',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 105,
        blog_id: 334,
        dest: 'https://www.sentient.ai/',
        type: 'external-link',
        title: 'Sentient Technologies',
        body:
          'An artificial intelligence startup seeking to solve the worldâ€™s most complex problems.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 106,
        blog_id: 334,
        dest: 'http://studio.ml/',
        type: 'external-link',
        title: 'Studio',
        body:
          'Studio is a model management framework written in Python to help minimize the overhead involved with scheduling, running, monitoring and managing artifacts of ML experiments.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'Markov Decision Processes',
    desc:
      '<p>Formally, an MDP is defined as the tuple containing states, actions, the transition function, and the reward function. This podcast examines each of these and presents them in the context of simple examples.Â  Despite MDPs suffering from the <a href= "https://dataskeptic.com/blog/episodes/2015/the-curse-of-dimensionality"> curse of dimensionality</a>, they\'re a useful formalism and a basic concept we will expand on in future episodes.</p>',
    pubDate: '2018-01-26T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/markov-decision-process.mp3?dest-id=201630',
    duration: '20:24',
    img:
      'https://static.libsyn.com/p/assets/6/2/a/c/62aca57ac4026e5f/ds-couch-mini-400.png',
    guid: '6471f356e05ac62de6819943e1ecc53f',
    link:
      'https://dataskeptic.com/blog/episodes/2018/markov-decision-processes',
    num: 198,
    blog_id: 325,
    author: 'Kyle',
    abstract:
      'Formally, an MDP is defined as the tuple containing states, actions, the transition function, and the reward function.  The rest of this post will define each of these components.',
    publish_date: '2018-01-26T17:27:18.000Z',
    prettyname: '/episodes/2018/markov-decision-processes',
    src_file: 'episodes/2018/markov-decision-processes.htm',
    related: [],
    contributors: []
  },
  {
    title: 'Neuroscience Frontiers',
    desc:
      "<p>Last week on Data Skeptic, we visited the Laboratory of Neuroimaging, or LONI, at USC and learned about their data-driven platform that enables scientists from all over the world to share, transform, store, manage and analyze their data to understand neurological diseases better. We talked about how neuroscientists measure the brain using data from MRI scans, and how that data is processed and analyzed to understand the brain. This week, we'll continue the second half of our two-part episode on LONI.</p>",
    pubDate: '2018-01-19T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/neuroscience-frontiers.mp3?dest-id=201630',
    duration: '29:06',
    img:
      'https://static.libsyn.com/p/assets/2/9/7/f/297f489c0255ce1a/DS-PodcastCover-R2.png',
    guid: '642bd344413becadc177b428285b7d26',
    link: 'https://dataskeptic.com/blog/episodes/2018/neuroscience-frontiers',
    num: 197,
    blog_id: 329,
    author: 'Kyle',
    abstract:
      "Last week on Data Skeptic, we visited the Laboratory of Neuroimaging, or LONI, at USC and learned about their data-driven platform that enables scientists from all over the world to share, transform, store, manage and analyze their data to understand neurological diseases better. We talked about how neuroscientists measure the brain using data from MRI scans, and how that data is processed and analyzed to understand the brain. This week, we'll continue the second half of our two-part episode on LONI.",
    publish_date: '2018-01-18T00:00:00.000Z',
    prettyname: '/episodes/2018/neuroscience-frontiers',
    src_file: 'episodes/2018/neuroscience-frontiers.htm',
    related: [
      {
        content_id: 87,
        blog_id: 329,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/farshid-sepehrband.jpg',
        type: 'person',
        title: 'Farshid Sepehrband ',
        body:
          'Farshid Sepehrband is a project specialist at the Laboratory of Neuroimaging (LONI) working under Dr. Arthur Toga. He received his PhD in Biotechnology and Neuroscience from the University of Queensland, Australia. Prior to that, Farshid obtained his MSc in Digital Electronics from Sharif University of Technology, Iran and his BSc in Computer Hardware Engineering from Tehran Central Azad University, Iran. One of his main interests is to use MRI to map macro- and micro-structures of brain tissue, in order to obtain micro-level neuroanatomical biomarkers. Farshid is also interested in studying microstructural alterations of brain tissue that occur during development and aging.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 88,
        blog_id: 329,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/ryan-cabeen.jpg',
        type: 'person',
        title: 'Ryan Cabeen',
        body:
          'Ryan Cabeen is a postdoctoral scholar at the USC Stevens Neuroimaging and Informatics Institute working on the development of neuroimaging tools for studying brain microstructure and connectivity. He received his PhD in Computer Science at Brown University and his BSc in Engineering and Applied Science at the California Institute of Technology. Ryanâ€™s research interests lie in the development and evaluation of computational tools for modeling, visualizing and analyzing scientific imaging datasets. Currently, he is investigating computational techniques to better understand the brainâ€™s structure through diffusion magnetic resonance imaging (MRI).',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 89,
        blog_id: 329,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/arthur-toga.jpg',
        type: 'person',
        title: 'Dr. Arthur Toga',
        body:
          'Dr. Arthur Toga is the Director of the Mark and Mary Stevens Neuroimaging and Informatics Institute at USC and the Provost Professor of Ophthalmology, Neurology, Psychiatry and Behavioral Sciences, Radiology and Engineering at USCâ€™s Keck School of Medicine. His research is focused on neuroimaging, mapping brain structure and function, and brain atlasing. Dr. Togaâ€™s team at the Laboratory of Neuro Imaging (LONI) has been working on the development and implementation of databases and data mining tools for linking disparate data from genetics, imaging, clinical and behavior, supporting global efforts in Alzheimerâ€™s disease, Huntingtonâ€™s and Parkinsonâ€™s disease.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 90,
        blog_id: 329,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/meng-law.jpg',
        type: 'person',
        title: 'Dr. Meng Law',
        body:
          "Dr. Meng Law is the Director of Neuroradiology at USC Keck School of Medicine and the Director of the Neuroimaging Core for the USC Alzheimer Disease Research Center. His main areas of treatment as a clinical radiologist include Alzheimer's disease, concussions, multiple sclerosis, traumatic brain injury, brain tumors, acute ischemic stroke, epilepsy, spinal disorders, aneurysms, and more. Although he is primarily a clinical physician, Dr. Law is also involved in research using MRI to study brain tumors, traumatic brain injury and Alzheimerâ€™s disease.",
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 91,
        blog_id: 329,
        dest: 'https://www.loni.usc.edu/',
        type: 'external-link',
        title: 'Laboratory of Neuro Imaging',
        body:
          'The Laboratory of Neuro Imaging (LONI) at USC  seeks to improve understanding of the brain in health and disease.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: []
  },
  {
    title: 'Neuroimaging and Big Data',
    desc:
      "<p>Last year, Kyle had a chance to visit the Laboratory of Neuroimaging, or LONI, at USC, and learn about how some researchers are using data science to study the function of the brain. Weâ€™re going to be covering some of their work in two episodes on Data Skeptic. In this first part of our two-part episode, we'll talk about the data collection and brain imaging and the LONI pipeline. We'll then continue our coverage in the second episode, where we'll talk more about how researchers can gain insights about the human brain and their current challenges. Next week, weâ€™ll also talk more about what all that has to do with data science machine learning and artificial intelligence. Joining us in this weekâ€™s episode are members of the LONI lab, which include principal investigators, Dr. Arthur Toga and Dr. Meng Law, and researchers, Farshid Sepherband, PhD and Ryan Cabeen, PhD.</p>",
    pubDate: '2018-01-12T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/neuroimaging-and-big-data.mp3?dest-id=201630',
    duration: '26:37',
    img:
      'https://static.libsyn.com/p/assets/5/8/9/b/589bcbd422eb9626/DS-PodcastCover-R2.png',
    guid: 'a9b3c28fbee332dc383caecb4efd7efb',
    link:
      'https://dataskeptic.com/blog/episodes/2018/neuroimaging-and-big-data',
    num: 196,
    blog_id: 326,
    author: 'Kyle',
    abstract:
      "Last year, Kyle had a chance to visit the Laboratory of Neuroimaging, or LONI, at USC, and learn about how some researchers are using data science to study the function of the brain. We're going to be covering some of their work in two episodes on Data Skeptic. In this first part of our two-part episode, we'll talk about the data collection and brain imaging and the LONI pipeline. We'll then continue our coverage in the second episode, where we'll talk more about how researchers can gain insights about the human brain and their current challenges. Next week, we'll also talk more about what all that has to do with data science machine learning and artificial intelligence. Joining us in this week's episode are members of the LONI lab, which include principal investigators, Dr. Arthur Toga and Dr. Meng Law, and researchers, Farshid Sepherband, PhD and Ryan Cabeen, PhD.",
    publish_date: '2018-01-12T00:00:00.000Z',
    prettyname: '/episodes/2018/neuroimaging-and-big-data',
    src_file: 'episodes/2018/neuroimaging-and-big-data.htm',
    related: [
      {
        content_id: 69,
        blog_id: 326,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/farshid-sepehrband.jpg',
        type: 'person',
        title: 'Farshid Sepehrband ',
        body:
          'Farshid Sepehrband is a project specialist at the Laboratory of Neuroimaging (LONI) working under Dr. Arthur Toga. He received his PhD in Biotechnology and Neuroscience from the University of Queensland, Australia. Prior to that, Farshid obtained his MSc in Digital Electronics from Sharif University of Technology, Iran and his BSc in Computer Hardware Engineering from Tehran Central Azad University, Iran. One of his main interests is to use MRI to map macro- and micro-structures of brain tissue, in order to obtain micro-level neuroanatomical biomarkers. Farshid is also interested in studying microstructural alterations of brain tissue that occur during development and aging.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 70,
        blog_id: 326,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/ryan-cabeen.jpg',
        type: 'person',
        title: 'Ryan Cabeen',
        body:
          'Ryan Cabeen is a postdoctoral scholar at the USC Stevens Neuroimaging and Informatics Institute working on the development of neuroimaging tools for studying brain microstructure and connectivity. He received his PhD in Computer Science at Brown University and his BSc in Engineering and Applied Science at the California Institute of Technology. Ryanâ€™s research interests lie in the development and evaluation of computational tools for modeling, visualizing and analyzing scientific imaging datasets. Currently, he is investigating computational techniques to better understand the brainâ€™s structure through diffusion magnetic resonance imaging (MRI).',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 71,
        blog_id: 326,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/arthur-toga.jpg',
        type: 'person',
        title: 'Dr. Arthur Toga',
        body:
          'Dr. Arthur Toga is the Director of the Mark and Mary Stevens Neuroimaging and Informatics Institute at USC and the Provost Professor of Ophthalmology, Neurology, Psychiatry and Behavioral Sciences, Radiology and Engineering at USCâ€™s Keck School of Medicine. His research is focused on neuroimaging, mapping brain structure and function, and brain atlasing. Dr. Togaâ€™s team at the Laboratory of Neuro Imaging (LONI) has been working on the development and implementation of databases and data mining tools for linking disparate data from genetics, imaging, clinical and behavior, supporting global efforts in Alzheimerâ€™s disease, Huntingtonâ€™s and Parkinsonâ€™s disease.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 72,
        blog_id: 326,
        dest:
          'https://s3.amazonaws.com/dataskeptic.com/guests/2018/meng-law.jpg',
        type: 'person',
        title: 'Dr. Meng Law',
        body:
          "Dr. Meng Law is the Director of Neuroradiology at USC Keck School of Medicine and the Director of the Neuroimaging Core for the USC Alzheimer Disease Research Center. His main areas of treatment as a clinical radiologist include Alzheimer's disease, concussions, multiple sclerosis, traumatic brain injury, brain tumors, acute ischemic stroke, epilepsy, spinal disorders, aneurysms, and more. Although he is primarily a clinical physician, Dr. Law is also involved in research using MRI to study brain tumors, traumatic brain injury and Alzheimerâ€™s disease.",
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      },
      {
        content_id: 73,
        blog_id: 326,
        dest: 'https://www.loni.usc.edu/',
        type: 'external-link',
        title: 'Laboratory of Neuro Imaging',
        body:
          'The Laboratory of Neuro Imaging (LONI) at USC  seeks to improve understanding of the brain in health and disease.',
        blog_id2: null,
        author: null,
        publish_date: null,
        guid: null,
        prettyname: null
      }
    ],
    contributors: [
      {
        blog_id: 326,
        contributor_id: 1,
        contribution: 'Co-producer',
        sort_order: 0,
        prettyname: 'Kyle Polich',
        img:
          'https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.jpg',
        twitter: 'dataskeptic',
        linkedin: 'https://www.linkedin.com/in/kyle-polich-5047193',
        bio:
          'Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.',
        author: 'kyle'
      },
      {
        blog_id: 326,
        contributor_id: 4,
        contribution: 'Co-producer',
        sort_order: 1,
        prettyname: 'Kristine de Leon',
        img:
          'https://s3.amazonaws.com/dataskeptic.com/contributors/kristen-de-leon.png',
        twitter: 'deleonkrist',
        linkedin: 'https://www.linkedin.com/in/kristine-de-leon-a7544149',
        bio:
          'Kristine is a fledgling science writer based in sunny Los Angeles, CA. Once a researcher in soil microbiology, Kristine is passionate about translating science into thrilling stories for all. She enjoys reading, the great outdoors, playing with logical systems, learning how stuff in the world works, and making things with metal.',
        author: 'kristine'
      }
    ]
  },
  {
    title: 'The Agent Model of Intelligence',
    desc:
      "<p>In artificial intelligence, the term 'agent' is used to mean an autonomous, thinking agent with the ability to interact with their environment. An agent could be a person or a piece of software. In either case, we can describe aspects of the agent in a standard framework.</p>",
    pubDate: '2018-01-05T16:00:00.000Z',
    mp3:
      'https://traffic.libsyn.com/dataskeptic/the-agent-model-of-intelligence.mp3?dest-id=201630',
    duration: '17:21',
    img:
      'https://static.libsyn.com/p/assets/b/8/2/e/b82e6c9131f13bce/ds-couch-mini-400.png',
    guid: '75ac8840c3ac7437aba957629de21c14',
    link:
      'https://dataskeptic.com/blog/episodes/2018/the-agent-model-of-intelligence',
    num: 195,
    blog_id: 323,
    author: 'Kyle',
    abstract:
      "In artificial intelligence, the term 'agent' is used to mean an autonomous, thinking agent with the ability to interact with their environment.  An agent could be a person or a piece of software.  In either case, we can describe aspects of the agent in a standard framew",
    publish_date: '2018-01-05T00:00:00.000Z',
    prettyname: '/episodes/2018/the-agent-model-of-intelligence',
    src_file: 'episodes/2018/the-agent-model-of-intelligence.htm',
    related: [],
    contributors: []
  }
]

const getEpisodes = (limit, offset) => {
  const url =
    base_api + `/podcast/episodes/list?limit=${limit}&offset=${offset}`
  return axios.get(url).then(res => res.data)
}

const fakeGetEpisode = (limit, offset) =>
  Promise.resolve(
    MOCKED_LIST.filter((i, index) => index >= offset && index <= offset + limit)
  )

module.exports = cache => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const { limit = 10, offset = 0 } = req.query

    return fakeGetEpisode(limit, offset)
      .then(list => res.send(list))
      .catch(error =>
        res.status(500).send({ success: false, error: error.data.errorMessage })
      )
  })

  return router
}
