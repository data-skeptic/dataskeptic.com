import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    const list = [
        {
            "rendered": "episodes/2017/quantum-computing.htm",
            "c_hash": "acc4dfa5fd87e60b25a4b2de9ee84d35",
            "date_discovered": "2017-11-25",
            "title": "Quantum Computing",
            "last_rendered": "2017-12-01",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/quantum-computing.md",
            "ext": ".md",
            "publish_date": "2017-12-01",
            "env": "master",
            "prettyname": "/episodes/2017/quantum-computing",
            "desc": "Scott Aaronson joins us this week to dispel some myths about quantum computing and share the ways in which a quantum computer has advantages over classical computers.",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/azure-databricks.htm",
            "c_hash": "41d868d1c268eb84885125c05231ed37",
            "date_discovered": "2017-11-25",
            "title": "Azure Databricks",
            "last_rendered": "2017-11-28",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/azure-databricks.md",
            "ext": ".md",
            "publish_date": "2017-11-28",
            "env": "master",
            "guid": "1e1711efd17f67e6cd336a1676647fee",
            "prettyname": "/episodes/2017/azure-databricks",
            "desc": "I sat down with Ali Ghodsi, CEO and founder of Databricks, and John Chirapurath, GM for Data Platform Marketing at Microsoft related to the recent announcement of Azure Databricks.",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/exp-time.htm",
            "c_hash": "8df75343c1f4db49bdeb3d4e6d9f3307",
            "date_discovered": "2017-11-23",
            "title": "EXP-Time",
            "last_rendered": "2017-11-23",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/exp-time.md",
            "ext": ".md",
            "publish_date": "2017-11-24",
            "env": "master",
            "guid": "c258f04f2cfef659ddf3c5f039094452",
            "prettyname": "/episodes/2017/exp-time",
            "desc": "In this episode we discuss the complexity class of EXP-Time which contains algorithms which require  time to run.  In other words, the worst case runtime is exponential in some polynomial of the input size.  Problems in this class are even more difficult than problems in  since you can't even verify a solution in polynomial t",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "opinions/2017/computational-complexity-for-data-scientists.htm",
            "c_hash": "7a3809db8d9ad151d16d486f884177aa",
            "date_discovered": "2017-11-21",
            "title": "Computational Complexity Theory for Data Scientists",
            "last_rendered": "2017-11-21",
            "author": "Kyle",
            "uri": "dataskeptic.com/opinions/2017/computational-complexity-for-data-scientists.md",
            "ext": ".md",
            "publish_date": "2017-11-22",
            "env": "master",
            "prettyname": "/opinions/2017/computational-complexity-theory-for-data-scientists",
            "desc": "As was announced a while back on the Data Skeptic podcast, the show is going to have running themes for the foreseeable future, in which we'll spend a few months talking about one topic or area.  We more or less did this earlier this year when we focused on deep learning following by a few episodes on deep learning in medical applications.  These themes will become more formal and more obvious going forw",
            "related": [

            ],
            "content": "<h2>Computational Complexity Theory for Data Scientists</h2>\n<p>As was announced a while back on the Data Skeptic podcast, the show is going to have running themes for the foreseeable future, in which we'll spend a few months talking about one topic or area.  We more or less did this earlier this year when we focused on deep learning following by a few episodes on deep learning in medical applications.  These themes will become more formal and more obvious going forward.</p>\n<p>From October 2017 to the end of the year, we're focusing on the field of computational complexity theory.  At a glance, this is a discipline might not seem to heavily overlap with what most people consider data science.  I imagine it also won't seem naturally connected to scientific skepticism in most people's minds.  Our episodes and a few blog posts will help make the links and overlaps more illuminated.</p>\n<p>I would also argue that complexity theory has made important contributions to logic and reasoning.   This field has been forced forced to seek out new ways of proving things when existing ways are proven to be ineffective.</p>\n<p>So why should any Data Skeptic listener care about the theory of computation?  Let me share with you, my top reasons.</p>\n<h2>Algorithms</h2>\n<p>When it comes to an understanding of algorithms, I find people that call themselves data scientists have a wide variance in their expertise.  For some, algorithms (often just machine learning algorithms) can be operated in a very \"blue collar\" way.  You can study Random Forest, XGBoost, SVM, Logistic Regression, etc., and gain an understanding of how to tune the parameters of these algorithms to good effect.  Surprisingly, this can be done with a very tenuous understanding of how those algorithms actually work \"under the hood.\"</p>\n<p>I personally think this is not enough.  I believe everyone should be learning the inner-workings of the algorithms you use.  But I will also admit, there's a lot of low hanging fruit in industry right now.  A basic understanding of how to apply machine learning can take you pretty far.  But eventually, you may have the opportunity to work on a truly interesting problem where the limiting factors aren't business process, lack of requirements, low quality data, or anything else are the inhibitor to progress.  At some point, making progress on a problem requires a very deep understanding of the ways in which an algorithm is <em>failing</em> to give you better results than might otherwise be possible.</p>\n<p>The more advanced of us are sometimes fortunate to work on problems like that, requiring a deep understanding of the optimization techniques used in those algorithms.  Selecting an alternative loss function, regularizing in a clever way, or tuning gradient descent are exciting topics which aren't always necessary in every real-world problem, but rewarding when they are.</p>\n<p>Most of what I've mentioned above could be described as \"how does the algorithm work?\", but there are important questions of \"how long does it take to do it's work?\" that are very important to ask.  This is the domain of computational complexity theory.  Ensuring your code has the predicted asymptotic results is a nice check.  If you know the theoretic results to expect, an empirical check of your code can help identify tricky implementation issues or areas where deep code optimization might help.</p>\n<p>Knowing about complexity can also help you spot tell-tale signs about the class of problem you might be dealing with when you start getting into something brand new.  Sometimes it's a data scientist's job to convey to an organization that they're over-constraining a problem, and propose a similar but different problem to solve which is much friendly in terms of runtime.</p>\n<h2>The Limits of Computation</h2>\n<p>The growth of the cloud and cheap compute resources have made it easy for people to mistakenly think every problem can be solved by just \"scaling up\".  Actually, that does work much of the time!  But for some problem, no matter how fancy the processor and how large the datacenter, certain problems are inefficient.  There are limits on what is computable.  Only by getting a very fundamental understanding of some key complexity classes and concepts can you appreciate the types of problems we're going to solve with data, and those that will require heuristics or something else.</p>\n<h2>Big Data</h2>\n<p>In the era of so-called big data, sometimes, the most basic of calculations (like a standard deviation) are actually costly and non-trivial to compute.  Interesting probabilistic algorithms like count-min sketch and bloom filters are approximation tools that trade off some accuracy for speed.  Learning how the algorithms requires understanding complexity.  Applying the same approximation \"tricks\" in other circumstances may also be beneficial to you.</p>\n<p>Parallelization questions in complexity typically fall into class <img className='latex-svg' src='http://s3.amazonaws.com/dataskeptic.com/latex/NC.svg' alt='NC' />.</p>\n<p>Streaming systems, which have to work with limited memory in order to be fast often fall into various space complexity classes.</p>\n<h2>Efficient Solutions</h2>\n<p>Being able to recognize if your solution is efficient in the <em>worst</em> case is critical to launching a web-scape technology.  There's a massive amount of traffic on the Internet.  If you tap into a large amount of it, statistically, you're going to experience a lot of outliers and a lot of worst case situations.</p>\n<h2>Approximate Solutions</h2>\n<p>A good deal of the literature in complexity theory is about all the things one cannot do.  Understanding why a particular problem is hard is often the first step in recognizing how that problem might be approximated efficiently.  Some problems have proofs that they can't be approximated well, while others admit efficient algorithms with <img className='latex-svg' src='http://s3.amazonaws.com/dataskeptic.com/latex/_epsilon.svg' alt='\\epsilon' /> close optimality.  In real life, that's good enough for me!</p>\n<h2>What it means to compute</h2>\n<p>At it's philosophical core, computer science can be described as the study of what it means to compute.  While thinking in those terms might not have any direct benefit to a data scientist, thinking about the tools we use can only make you more creative about how we apply them in the future.</p>\n<h2>Machine Learning for Fun and Profit</h2>\n<p>In the episode titled <a href=\"https://dataskeptic.com/blog/episodes/2016/stealing-machine-learning-models-from-cloud-apis\">Stealing Machine Learning Models from Cloud APIs</a>, guest Florian Tramèr explained to us how he was able to extract the models used by various cloud services.</p>\n<p>What does that mean for you?</p>\n<p>Let's say you come up with a very clever solution of some kind.  For example, given a picture of a garage sale item, you predict the market rate for the item by zip code.  Let's assume you've done a stellar job creating this system, and it's highly accurate!  You'd like to turn this into a business.  However, once you give someone your model, its trivial to copy it, and hard to monetize.  What if instead, you set up a web API where people sent you photos, and you returned the predictions.  The model never leaves your server, so the client must continue to pay-per-use to enjoy your creation.  Simple right?</p>\n<p>Not quite.  That model can be stolen through some clever techniques, despite the presumed security offered by the veil of the API.  Granted, if your API is static, then it's probably not worth paying much for.  An adaptive, dynamic system might not be as easy to steal, or as useful without the updates, but regardless, the tools of complexity theory can be helpful in asking questions what can be learned about a black box system.</p>\n<h2>Relationship to Deep Learning</h2>\n<p>Speaking of black box systems, we now live in a world where powerful tools are entirely constructed using machine learning.  We can't always tell you <em>how</em> our systems work, but we can empirically prove that they do.</p>\n<p>What are the limits of learn-ability?  How big must our hidden layers be to solve a given problem?  Questions like these require a good understanding of complexity.</p>\n<p>Generative adversarial learning has been a popular technique in recent years.  The adversarial aspect of the process seems to beg some fascinating questions that haven't really been articulated well yet about bounds on these adversarial behaviors.  Many game playing strategies are in complexity classes like <img className='latex-svg' src='http://s3.amazonaws.com/dataskeptic.com/latex/PSPACE.svg' alt='PSPACE' /> and <img className='latex-svg' src='http://s3.amazonaws.com/dataskeptic.com/latex/EXP-Time.svg' alt='EXP-Time' />.</p>\n<h2>Artificial General Intelligence</h2>\n<p>As breakthroughs in AI seem (presumably) to take us incremental steps closer to the creation of a machine that passes the Turing Test, complexity theory is the right tool to ask questions about the limits of mind and machines.  Is there anything a human brain can do that no computer can do?  If you think so, then you have the burden of proof.  What's to stop a computer from doing a very deeply accurate simulation of the human brain?  Is there any reason why that couldn't be done?  Not that I know of, but surly if I did, it would be a result in the language of complexity theory.</p>\n<h2>The future</h2>\n<p>The above sections highlight the reasons I personally think someone interested in data science should care about computational complexity theory.  You'll notice I left off important topics like cryptography.  Very important, but not necessarily to a data scientist.</p>\n<p>Similarly, interesting ideas like interactive proof systems and quantum computing just don't make my list, despite the immediate advantages we'd have with fast PCA, matrix inversion, and FFT that we'd get if a large quantum computer could be created.</p>\n<p>If you're looking for a good place to start, check out <a href=\"https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X\">Introduction to the Theory of Computation</a>.  If you're looking for something more advanced, <a href=\"https://www.amazon.com/Computational-Complexity-Theory-Park-Mathematics/dp/082182872X\">Computational Complexity Theory</a> is a nice book to get into after.</p>",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "methods/2017/the-formal-statement-of-p-not-equal-to-np.htm",
            "c_hash": "d2de81f5784ca7167d9612e2eaab45a6",
            "date_discovered": "2017-11-19",
            "title": "The Formal Statement of P not equal to NP",
            "last_rendered": "2017-11-21",
            "author": "Kyle",
            "uri": "dataskeptic.com/methods/2017/the-formal-statement-of-p-not-equal-to-np.md",
            "ext": ".md",
            "publish_date": "2017-11-20",
            "env": "master",
            "prettyname": "/methods/2017/the-formal-statement-of-p-not-equal-to-np",
            "desc": "In the last episode of Data Skeptic, I asked Lance Fortnow about whether or not is was possible P vs NP was ill-posed.  He correctly pointed out that, while some surprising result come emerge (like showing its impossible to solve it), it can't be ill-posed, because the problem has a formal mathematical statement.  That statement is be",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/p-vs-np.htm",
            "c_hash": "1aaa915d1eb10ec7dbbe72a70bbc5534",
            "date_discovered": "2017-11-17",
            "title": "P vs NP",
            "last_rendered": "2017-11-19",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/p-vs-np.md",
            "ext": ".md",
            "publish_date": "2017-11-17",
            "env": "master",
            "guid": "10bf39fd4c7b729a2fa6ca9f4b6757bb",
            "prettyname": "/episodes/2017/p-vs-np",
            "desc": "In this week's episode, host Kyle Polich interviews author Lance Fortnow about whether P will ever be equal to NP and solve all of life's problems. At the heart of the P-NP problem is the question \"are there problems for which the answers can be checked by computers, but not found in a reasonable time?\" If there are such problems, then P does not equal NP. However, if all answers can be found easily as well as checked (if only we found out how) then P equals ",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "news/2017/microsoft-connect-2017.htm",
            "c_hash": "60d932be76e6f991217a0653decb097d",
            "date_discovered": "2017-11-15",
            "title": "Microsoft Connect 2017",
            "last_rendered": "2017-11-28",
            "author": "Kyle",
            "uri": "dataskeptic.com/news/2017/microsoft-connect-2017.md",
            "ext": ".md",
            "publish_date": "2017-11-15",
            "env": "master",
            "prettyname": "/news/2017/microsoft-connect-2017",
            "desc": "I attended Microsoft Connect today.  These are my notes about the announcements I found notewor",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/sudoku-in-np.htm",
            "c_hash": "1b35f3a421cce8cdbff975019ebe7f2f",
            "date_discovered": "2017-11-09",
            "title": "Sudoku in NP",
            "last_rendered": "2017-11-09",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/sudoku-in-np.md",
            "ext": ".md",
            "publish_date": "2017-11-10",
            "env": "master",
            "guid": "a9bb14676f332d625ced474b2a8333e4",
            "prettyname": "/episodes/2017/sudoku-in-np",
            "desc": "or the title as I prefer it to rende",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/the-computational-complexity-of-machine-learning.htm",
            "c_hash": "29521d123190832517c81502ec798b78",
            "date_discovered": "2017-11-02",
            "title": "The Computational Complexity of Machine Learning",
            "last_rendered": "2017-11-02",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/the-computational-complexity-of-machine-learning.md",
            "ext": ".md",
            "publish_date": "2017-11-03",
            "env": "master",
            "guid": "f99aaea895a6a3daa8e7d155a23df1bd",
            "prettyname": "/episodes/2017/the-computational-complexity-of-machine-learning",
            "desc": "In this episode, Professor Michael Kearns from the University of Pennsylvania joins host Kyle Polich to talk about the computational complexity of machine learning, complexity in game theory, and algorithmic fairness. Michael's doctoral thesis gave an early broad overview of computational learning theory, in which he emphasizes the mathematical study of efficient learning algorithms by machines or computational syste",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        },
        {
            "rendered": "episodes/2017/turing-machines.htm",
            "c_hash": "bb0dd3860a49b9dc9140a507e7179344",
            "date_discovered": "2017-10-26",
            "title": "Turing Machines",
            "last_rendered": "2017-10-28",
            "author": "Kyle",
            "uri": "dataskeptic.com/episodes/2017/turing-machines.md",
            "ext": ".md",
            "publish_date": "2017-10-27",
            "env": "master",
            "guid": "2492bf207d1ed5a1c06f79aef19e9634",
            "prettyname": "/episodes/2017/turing-machines",
            "desc": "TMs are an model of computation at the heart of algorithmic analysis.  A Turing Machine has two components.  An infinitely long piece of tape (memory) with re-writable squares and a read/write head which is programed to change it's state as it processes the input.  This exceptionally simple mechanical computer can compute anything that is intuitively computable, thus says the Church-Turing The",
            "contributor": {
                "prettyname": "Kyle Polich",
                "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
                "twitter": "@dataskeptic",
                "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
                "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
                "sort-rank": 1
            }
        }
    ]

    res.send(list)
})

router.get('/:id', (req, res) => {
    const post = {
        "rendered": "episodes/2017/turing-machines.htm",
        "c_hash": "bb0dd3860a49b9dc9140a507e7179344",
        "date_discovered": "2017-10-26",
        "title": "Turing Machines",
        "last_rendered": "2017-10-28",
        "author": "Kyle",
        "uri": "dataskeptic.com/episodes/2017/turing-machines.md",
        "ext": ".md",
        "publish_date": "2017-10-27",
        "env": "master",
        "guid": "2492bf207d1ed5a1c06f79aef19e9634",
        "prettyname": "/episodes/2017/turing-machines",
        "desc": "TMs are an model of computation at the heart of algorithmic analysis.  A Turing Machine has two components.  An infinitely long piece of tape (memory) with re-writable squares and a read/write head which is programed to change it's state as it processes the input.  This exceptionally simple mechanical computer can compute anything that is intuitively computable, thus says the Church-Turing The",
        "contributor": {
            "prettyname": "Kyle Polich",
            "img": "https://s3.amazonaws.com/dataskeptic.com/contributors/kyle-polich.png",
            "twitter": "@dataskeptic",
            "linkedin": "https://www.linkedin.com/in/kyle-polich-5047193",
            "bio": "Kyle studied computer science and focused on artificial intelligence in grad school.  His general interests range from obvious areas like statistics, machine learning, data viz, and optimization to data provenance, data governance, econometrics, and metrology.",
            "sort-rank": 1
        }
    }

    res.send(post)
})


module.exports = router