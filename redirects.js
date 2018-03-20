var redirects_map = {
  '/ma': '/careers',
  '/epnotes/causal-impact.php': '/blog/episodes/2016/causal-impact',
  '/blog/episodes/2017/polling':
    '/blog/episodes/2017/opinion-polling-for-presidential-elections',
  '/blogundefined': '/blog',
  '/blog/opinions/2017/is-humor-truly-ai-complete':
    '/blog/ai/2017/is-humor-truly-ai-complete',
  '/epnotes/the-bootstrap.php': '/blog/episodes/2016/the-bootstrap',
  '/epnotes/gini-coefficient.php': '/blog/episodes/2016/gini-coefficient',
  '/epnotes/unstructured-data-for-finance.php':
    '/blog/episodes/2016/unstructured-data-for-finance',
  '/epnotes/adaboost.php': '/blog/episodes/2016/adaboost',
  '/epnotes/stealing-models-from-the-cloud.php':
    '/blog/episodes/2016/stealing-machine-learning-models-from-cloud-apis',
  '/epnotes/calculating-feature-importance.php':
    '/blog/episodes/2016/calculating-feature-importancelt',
  '/epnotes/nyc-bikeshare-rebalancing.php':
    '/blog/episodes/2016/nyc-bike-sharing-rebalancing',
  '/epnotes/random-forest.php': '/blog/episodes/2016/random-forest',
  '/epnotes/election-predictions.php':
    '/blog/episodes/2016/election-predictions',
  '/epnotes/f1-score.php': '/blog/episodes/2016/f1-score',
  '/epnotes/urban-congestion.php': '/blog/episodes/2016/urban-congestion',
  '/epnotes/heteroskedasticity.php': '/blog/episodes/2016/heteroskedasticity',
  '/epnotes/music21.php': '/blog/episodes/2016/music21',
  '/epnotes/paxos.php': '/blog/episodes/2016/paxos',
  '/epnotes/trusting-machine-learning-models-with-lime.php':
    '/blog/episodes/2016/trusting-machine-learning-models-with-lime',
  '/epnotes/anova.php': '/blog/episodes/2016/anova',
  '/epnotes/machine-learning-on-images-with-noisy-human-centric-labels.php':
    '/blog/episodes/2016/machine-learning-on-images-with-noisy-human-centric-labels',
  '/epnotes/survival-analysis.php':
    '/blog/episodes/2016/survival-analysis-and-marriage',
  '/epnotes/predictive-models-on-random-data.php':
    '/blog/episodes/2016/predictive-models-on-random-data',
  '/epnotes/roc.php':
    '/blog/episodes/2016/receiver-operating-characteristic-(roc)-curve',
  '/epnotes/multiple-comparisons.php':
    '/blog/episodes/2016/multiple-comparisons-and-conversion-optimization',
  '/epnotes/leakage.php': '/blog/episodes/2016/leakage',
  '/epnotes/predictive-policing.php': '/blog/episodes/2016/predictive-policing',
  '/epnotes/cap-theorem.php': '/blog/episodes/2016/the-cap-theorem',
  '/epnotes/detecting-terrorists-with-facial-recognition.php':
    '/blog/episodes/2016/detecting-terrorists-with-facial-recognition',
  '/epnotes/goodharts-law.php': '/blog/episodes/2016/goodharts-law',
  '/epnotes/data-science-at-eharmony.php':
    '/blog/episodes/2016/data-science-at-eharmony',
  '/epnotes/stationarity-and-differencing.php':
    '/blog/episodes/2016/stationarity-and-differencing',
  'http://dataskeptic.libsyn.com/feather': '/blog/episodes/2016/feather',
  '/epnotes/bargaining.php': '/blog/episodes/2016/bargaining',
  '/epnotes/deepjazz.php': '/blog/episodes/2016/deepjazz',
  '/epnotes/acf-correlograms.php': '/blog/episodes/2016/acf-correlograms',
  '/epnotes/early-identification-of-violent-criminal-gang-members.php':
    '/blog/episodes/2016/early-identification-of-violent-criminal-gang-members',
  '/epnotes/fractional-factorial-design.php':
    '/blog/episodes/2016/fractional-factorial-design',
  '/epnotes/machine-learning-done-wrong.php':
    '/blog/episodes/2016/machine-learning-done-wrong',
  '/epnotes/potholes.php': '/blog/episodes/2016/potholes',
  '/epnotes/the-elbow-method.php': '/blog/episodes/2016/the-elbow-method',
  '/epnotes/too-good-to-be-true.php': '/blog/episodes/2016/too-good-to-be-true',
  '/epnotes/r-squared.php': '/blog/episodes/2016/r-squared',
  '/epnotes/models-of-mental-simulation.php':
    '/blog/episodes/2016/models-of-mental-simulationlt',
  '/epnotes/multiple-regression.php': '/blog/episodes/2016/multiple-regression',
  '/epnotes/scientific-studies-of-peoples-relationship-to-music.php':
    '/blog/episodes/2016/scientific-studies-of-peoples-relationship-to-music',
  '/epnotes/k-d-trees.php': '/blog/episodes/2016/k-d-trees',
  '/epnotes/auditing-algorithms.php': '/blog/episodes/2016/auditing-algorithms',
  '/epnotes/bonferroni-correction.php':
    '/blog/episodes/2016/bonferroni-correction',
  '/epnotes/detecting-pseudo-profound-bs.php':
    '/blog/episodes/2016/detecting-pseudo-profound-bs',
  '/epnotes/gradient-descent.php': '/blog/episodes/2016/gradient-descent',
  '/epnotes/kill-the-word-cloud.php': '/blog/episodes/2016/kill-the-word-cloud',
  '/epnotes/2015-holiday-special.php':
    '/blog/episodes/2015/2015-holiday-special',
  '/epnotes/wikipedia-revision-scoring-as-a-service.php':
    '/blog/episodes/2015/wikipedia-revision-scoring-as-a-service',
  '/epnotes/tf-idf.php': '/blog/episodes/2015/tf-idf',
  '/epnotes/the-hunt-for-vulcan.php': '/blog/episodes/2015/the-hunt-for-vulcan',
  '/epnotes/the-accuracy-paradox.php':
    '/blog/episodes/2015/the-accuracy-paradox',
  '/epnotes/neuroscience-from-a-data-scientists-perspective.php':
    '/blog/episodes/2015/neuroscience-from-a-data-scientists-perspective',
  '/epnotes/bias-variance-tradeoff.php':
    '/blog/episodes/2015/bias-variance-tradeoff',
  '/epnotes/big-data-doesnt-exist.php':
    '/blog/episodes/2015/big-data-doesnt-exist',
  '/epnotes/ep79_covariance-and-correlation.php':
    '/blog/episodes/2015/covariance-and-correlation',
  '/epnotes/ep78_bayesian-a-b-testing.php':
    '/blog/episodes/2015/bayesian-ab-testing',
  '/epnotes/ep77_central-limit-theorem.php':
    '/blog/episodes/2015/the-central-limit-theorem',
  '/epnotes/ep76_accessible-technology.php':
    '/blog/episodes/2015/accessible-technology',
  '/epnotes/ep75_multi-armed-bandit-problems.php':
    '/blog/episodes/2015/multi-armed-bandit-problems',
  '/epnotes/ep74_shakespeare-abiogenesis-and-exoplanets.php':
    '/blog/episodes/2015/shakespeare-abiogenesis-and-exoplanets',
  '/epnotes/ep73_small-sample-sizes.php': '/blog/episodes/2015/sample-sizes',
  '/epnotes/ep72_model-complexity-myth.php':
    '/blog/episodes/2015/the-model-complexity-myth',
  '/blog/episodes/2015/the-models-complexity-myth':
    '/blog/episodes/2015/the-model-complexity-myth',
  '/epnotes/ep71_distance-measures.php':
    '/blog/episodes/2015/distance-measures',
  '/epnotes/ep70_contentmine.php': '/blog/episodes/2015/contentmine',
  '/epnotes/ep69_structured-and-unstructured.php':
    '/blog/episodes/2015/structured-and-unstructured-data',
  '/epnotes/ep68_measuring-the-influence-of-fashion-designers.php':
    '/blog/episodes/2015/measuring-the-influence-of-fashion-designers',
  '/epnotes/ep67_pagerank.php': '/blog/episodes/2015/pagerank',
  '/epnotes/ep66_data-science-at-work-in-la-county.php':
    '/blog/episodes/2015/data-science-at-work-in-la-county',
  '/epnotes/ep65_k-nearest-neighbors.php':
    '/blog/episodes/2015/k-nearest-neighbors',
  '/bf/': '/blog/episodes/2015/crypto',
  '/epnotes/ep63_map-reduce.php': '/blog/episodes/2015/mapreduce',
  '/epnotes/ep62_genetically-engineered-food-and-trends-in-herbicide-usage.php':
    '/blog/episodes/2015/genetically-engineered-food-and-trends-in-herbicide-usage',
  '/epnotes/ep61_the-curse-of-dimensionality.php':
    '/blog/episodes/2015/the-curse-of-dimensionality',
  '/epnotes/ep60_game-analytics.php':
    '/blog/episodes/2015/game-analytics-with-anders-drachen',
  '/epnotes/ep59_anscombes_quartet.php':
    '/blog/episodes/2015/anscombes-quartet',
  '/epnotes/proposing-annoyance-mining.php':
    '/blog/episodes/2015/proposing-annoyance-mining',
  '/epnotes/ep57_preserving-history-at-cyark.php':
    '/blog/episodes/2015/preserving-history-at-cyark',
  '/epnotes/ep56_a-critical-examination-of-a-study-of-marriage-by-political-affiliation.php':
    '/blog/episodes/2015/a-critical-examination-of-a-study-of-marriage-by-political-affiliation',
  '/epnotes/ep55_detecting-cheating-in-chess.php':
    '/blog/episodes/2015/detecting-cheating-in-chess',
  '/epnotes/ep54_z-scores.php': '/blog/episodes/2015/z-scores',
  '/epnotes/ep53_using-data-to-help-those-in-crisis.php':
    '/blog/episodes/2015/using-data-to-help-those-in-crisis',
  '/epnotes/ep52_the-ghost-in-the-mp3-with-Ryan-Maguire.php':
    '/blog/episodes/2015/the-ghost-in-the-mp3',
  '/epnotes/ep51_data-fest-2015.php': '/blog/episodes/2015/data-fest-2015',
  '/epnotes/ep50_the-cornbread-episode-on-over-dispersion.php':
    '/blog/episodes/2015/cornbread-and-overdispersion',
  '/epnotes/ep49_natural-language-processing.php':
    '/blog/episodes/2015/natural-language-processing',
  '/epnotes/ep48_computer-based-personality-judgments-with-Youyou-Wu.php':
    '/blog/episodes/2015/computer-based-personality-judgmentsh1',
  '/epnotes/ep47_Markov-chain-monte-carlo.php':
    '/blog/episodes/2015/markov-chain-monte-carlo',
  '/epnotes/ep46_Markov-Chains.php': '/blog/episodes/2015/markov-chains',
  '/epnotes/ep45_Oceanography-and-Data-Science.php':
    '/blog/episodes/2015/oceanography-and-data-science',
  '/epnotes/ordinary-least-squares.php':
    '/blog/episodes/2015/ordinary-least-squares-regression',
  '/epnotes/ep43_NYC-Speed-Camera-Analysis-with-Tim-Schmeier.php':
    '/blog/episodes/2015/nyc-speed-camera-analysis',
  '/epnotes/k-means-clustering.php': '/blog/episodes/2015/k-means-clustering',
  '/epnotes/ep41_Shadow-Profiles-on-Social-Networks-with-Emre-Sarigol.php':
    '/blog/episodes/2015/shadow-profiles-on-social-networks',
  '/epnotes/ep40_chi_sq_test.php': '/blog/episodes/2015/the-chi-squared-test',
  '/epnotes/ep39_mapping-reddit-topics.php':
    '/blog/episodes/2015/mapping-reddit-topics',
  '/epnotes/partially-observable-state-spaces.php':
    '/blog/episodes/2015/partially-observable-state-spaces',
  '/epnotes/ep37_easily-fooling-deep-neural-networks.php':
    '/blog/episodes/2015/easily-fooling-deep-neural-networks',
  '/epnotes/ep36_data-provenance.php': '/blog/episodes/2015/data-provenance',
  '/epnotes/ep35_doubtful-news-geology-and-thinking-scientifically-with-Sharon-Hill.php':
    '/blog/episodes/2015/doubtful-news-geology-investigating-paranormal-groups-and-thinking-scientifically-with-sharon-hill',
  '/epnotes/belief-in-santa.php': '/blog/episodes/2014/belief-in-santa',
  '/epnotes/ep33_Economic-Modeling-and-Prediction-with-Peter-Backus.php':
    '/blog/episodes/2014/economic-modeling-and-prediction-charitable-giving-and-a-follow-up-with-peter-backus',
  '/epnotes/ep32_battle-of-the-sexes.php':
    '/blog/episodes/2014/the-battle-of-the-sexes',
  '/epnotes/ep31_plenty-of-fish-data-science-approaches-with-thomas-levi.php':
    '/blog/episodes/2014/the-science-of-online-data-at-plenty-of-fish-with-thomas-levi',
  '/epnotes/ep30_the_girlfriend_equation.php':
    '/blog/episodes/2014/mini-the-girlfriend-equation',
  '/epnotes/ep29_the-secret-and-the-global-consciousness-project.php':
    '/blog/episodes/2014/the-secret-and-the-global-consciousness-project-with-alex-boklin',
  '/epnotes/ep28_random-numbers.php':
    '/blog/episodes/2014/mini-monkeys-on-typewriters',
  '/epnotes/ep27_mining-the-social-web.php':
    '/blog/episodes/2014/mining-the-social-web-with-matthew-russell',
  '/epnotes/is-the-internet-secure.php':
    '/blog/episodes/2014/is-the-internet-secure',
  '/epnotes/practicing-and-communicating-data-science.php':
    '/blog/episodes/2014/practicing-and-communicating-data-science-with-jeff-stanton',
  '/epnotes/t-test.php': '/blog/episodes/2014/the-t-test',
  '/epnotes/ep023.php': '/blog/episodes/2014/urban-legends-with-karl-mamer',
  '/epnotes/ep022.php': '/blog/episodes/2014/contest',
  '/epnotes/selection-bias.php': '/blog/episodes/2014/selection-bias',
  '/epnotes/confidence-intervals.php':
    '/blog/episodes/2014/confidence-intervals',
  '/epnotes/value-of-information.php':
    '/blog/episodes/2014/value-of-information',
  '/epnotes/ep017.php':
    '/blog/episodes/2014/game-science-dice-with-louis-zocchi',
  '/epnotes/ep17_zest-finance-with-marick-sinay.php':
    '/blog/episodes/2014/data-science-at-zestfinance-with-marick-sinay',
  '/epnotes/decision-tree-learning.php':
    '/blog/episodes/2014/decision-tree-learning',
  '/epnotes/ep014.php':
    '/blog/episodes/2014/jackson-pollock-authentication-analysis-with-kate-jones-smith',
  '/epnotes/noise.php': '/blog/episodes/2014/noise',
  '/epnotes/ep012.php':
    '/blog/episodes/2014/guerilla-skepticism-on-wikipedia-with-susan-gerbic',
  '/epnotes/ant-colony-optimization.php':
    '/blog/episodes/2014/ant-colony-optimization',
  '/epnotes/ep010.php': '/blog/episodes/2014/data-in-healthcare-it',
  '/epnotes/cross-validation.php': '/blog/episodes/2014/cross-validation',
  '/epnotes/ep008.php':
    '/blog/episodes/2014/streetlight-outage-and-crime-rate-analysis',
  '/epnotes/experimental-design.php': '/blog/episodes/2014/experimental-design',
  '/epnotes/ep006.php':
    '/blog/episodes/2014/the-right-(big-data)-tool-for-the-job-with-jay-shankar',
  '/epnotes/ep005.php': '/blog/episodes/2014/personalized-medicine',
  '/epnotes/ep004.php': '/blog/episodes/2014/bayesian-updating',
  '/epnotes/p-values.php': '/blog/episodes/2014/p-values',
  '/epnotes/ep002.php':
    '/blog/episodes/2014/advertising-attribution-with-nathan-janos',
  '/epnotes/type_i_type_ii.php': '/blog/episodes/2014/type-i--type-ii-errors',
  '/epnotes/ep001.php': '/blog/episodes/2014/introduction',
  '/trans/ep55_detecting-cheating-in-chess.php':
    '/blog/transcripts/2015/detecting-cheating-in-chess',
  '/episodes/2017/mutli-agent-diverse-generative-adversarial-networks':
    '/blog/episodes/2017/multi-agent-diverse-generative-adversarial-networks',
  '/store.php': '/store',
  '/episodes.php': '/podcast',
  '/allepisodes.php': '/podcast',
  '/allepisodes.php?skip=10': '/podcast',
  '/home-sales/': '/blog/open-house/',
  '/home-sales': '/blog/open-house/'
}

exports.redirects_map = redirects_map
