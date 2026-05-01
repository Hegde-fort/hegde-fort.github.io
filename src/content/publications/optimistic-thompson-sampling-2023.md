---
draft: false
title: "Optimistic Thompson Sampling-based algorithms for episodic reinforcement learning"
authors:
  - "Bingshan Hu"
  - "Tianyue H. Zhang"
  - "Nidhi Hegde"
  - "Mark Schmidt"
venue: "Proceedings of the Thirty-Ninth Conference on Uncertainty in Artificial Intelligence (UAI 2023)"
year: 2023
url: "https://proceedings.mlr.press/v216/hu23a.html"
abstract: "We propose two Thompson Sampling-like, model-based learning algorithms for episodic Markov decision processes (MDPs) with a finite time horizon. Our proposed algorithms are inspired by Optimistic Thompson Sampling (O-TS), empirically studied in Chapelle and Li [2011], May et al. [2012] for stochastic multi-armed bandits. The key idea for the original O-TS is to clip the posterior distribution in an optimistic way to ensure that the sampled models are always better than the empirical models. Both of our proposed algorithms are easy to implement and only need one posterior sample to construct an episode-dependent model. Our first algorithm, O-TS-MDP, achieves a near-optimal regret bound, and our second algorithm, O-TS-MDP+, achieves the (near)-optimal regret bound by taking a more aggressive clipping strategy. We also derive regret bounds of O-TS for stochastic bandits and propose O-TS-Bandit+, a randomized version of UCB1, both achieving the optimal problem-dependent regret bound."
tags:
  - "reinforcement learning"
  - "Thompson sampling"
  - "bandits"
  - "machine learning"
featured: false
---
