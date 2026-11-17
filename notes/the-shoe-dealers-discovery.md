---
title: "The shoe dealer's discovery"
domain: "Informatique de Gestion"
tags: [gestion, comptabilite]
related: [gestionperso]
---

_The shoe dealer's discovery._
_He had just finished a three weeks' successful bargain sale, adn was sitting at his desk looking over a large pile of bills and statements. He knew that other statements, including one from the local newspapers for use of a large advertising space, would probably be in that morning's mail, as well as bills for outdoor posters and special windows signs. As the sale had been a lively one, and the bulk of the store's odds and ends had been disposed of at a trifle above original invoice cost. He had no special misgivings at the prospect of receiving and paying the bills for the special advertising. He had a good bank account. He handled well-known reliable brands of shoes, and his stores enjoyed a steady patronage throughout the year._
_But as he went over his bills, down towards the bottom of the pile, he came to a few things he had not expected._
	_One was a note from his student agent at the college four miles from town, asking for the $4.50 commission for selling nine pars of shoes to fellow-undergraduates_
	_A printed notice reminded him politely that the gas bill for his store was overdue._
	_A letter from a distant large city informed him that for twenty dollars per week the writer would accept the position of a window-trimmer and would wait on customers "at odd moments"._
	_The last thing in this merchant's pile of Monday morning mail was a forgotten bill of fity-eight dollars for refinishing the settees and providing new fitting-stools for the store._
_He made a few hesitating figures on a scratch-block, then began to think aloud.
"How much does it cost me to do business, anyway?_
_What do I really get out of it?_
_What % do I make on my investments? = What's my [[ROI]]?_ (investment in inventory and merchendise)%%
_I wonder how last month's expense compares with a year ago last month. What were my sales last motnh? That bargain sale must have helped._
_He then asked the cashier : "What have you got in the way of records that you can refer to quickly and tell me exactly what our sales and expenses were last month and a year ago last month?_
```SQL
	SELECT
	    period,
	    SUM(sales)    AS total_sales,
	    SUM(expenses) AS total_expenses
	FROM monthly_accounts
	WHERE period IN ('1924-XX', '1923-XX')
	GROUP BY period;
```
_The reply was : "We have the total we pad out last month, and you know we have all the slips for the sales, but we don't add them up. It will be a pretty big job to go through last year's boos and all that big bunch of sales-slips down-stairs and girue up the expenses and sales. What is it you want this for? Is anything wrong? We are practically up-to-date on our bills and collections, and the store bank account is as much as usual." "No nothing wrong.
What I or any shoe dealer who expects to be succssful, ought to know, is how much I am paying out a month for all expenses, what different items are, what I actually net from the sale of goods, what percentage of gross and net profit_I make and then compare each month's showing for every different item._
_How do I know what effect a good or poorly advertised bargain sale has on my season's business?_
_How do I know how much shoe polish and laces I can afford to give way?_
_How do I know whether we waste electricity?_
_How do I know whether I can afford 10 or 12% commision to my college age,t, or $20/week to a window-trimmer?_

_The shoe dealer's investigation and the result_ - La nécessité de l'[[accounting]] .
_This merchant proceded to make life miserable for his cashier all the rest of that day and a part of the next, in digging up back inoces, jobbing price-lists, bills, and statements of all kinds, records of sales, commissions, discounts, rebates, and other data in th store's filling cabinet._
_He classified his stock-prchases, sales and all expenses for store maintenance. He reduced these to a simple monthly record-sheet which could be filled out in about an hour's time at the end of each month.  _He investigated his past operating expenditures sufficiently to determine a normal figure for each kind of expense each month, and thus obtained an accurate basis of comparison with actual future expenses. His new system enabled him to determine exactly what grades of goods he should push, and to watch and prevent unnecessary and unprofitable operating expenses. It showed him at a glance what his total investment was and what net profit he was making from month to month. It developed him in fifteen month from an average easy-going dealer into of the keenest, most successful retail shoe-merchants in his State. And he did all that unaided. To-day he could get from any one of various sources at an expense of a few cents a complete system of accounting and cost-finding for his store, with complete suggestions for its installation.
__
