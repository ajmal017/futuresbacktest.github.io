---
title: Carry
permalink: /docs/strategies/carry/
layout: default
---

# Carry

In a general sense, the carry of an asset is the cost (or the gain) that one incur when holding a position, if market conditions remain unchanged. It can be viewed as an implicit interest rate paid or received when holding the position, everything else being equal.

A *carry* strategy will seek long exposure to the assets which yield the highest interest rate (in the sense previously described) and short exposure to the assets which yields the lowest negative interest rates.

A *carry* strategy can be applied to multiple assets classes, requiring however different definitions of carry. It can be defined mostly in two ways:
- directly, using data related to the underlying asset and applying a pricing model to derive the theoretical carry of the position;
- indirectly, using the term structure of futures contracts.

## Currencies

Currencies may be the most well-known assets class for *carry* strategies. Simply put, this strategy on currency pairs will go long on high yield currencies and short on low yield currencies. If market conditions remain unchanged, such strategy on a given currency pair would yield the difference between the short term interest rates of the two currencies multiplied by the nominal amount of the position. The risk of such a strategy is of course that the exchange rate between the two currencies varies.

To compute carry indicators for currencies we use the indirect method: we use daily settlement prices for front and deferred contracts to derive the carry of the futures contract, then annualized appropriately.

## Commodities

We use a similar definition for carry in commodity futures: we compute the carry indicator with the indirect method, using settlement prices. As many commodity future contracts features seasonal patterns, we derive the carry from contracts taken 12 months apart. When several 12-month pairs of contracts are available we take the median. However we limit ourselves to the first 18 months of the term structure.

Applied to commodity futures, carry is related to the sum of the cost of storage and the cost of borrowing (which can be considered as the actual cost of carry), but it also reflects hedging pressure, when market participant are wiling to pay more to hedge long or short positions. Typically, commodities producers would take short positions to hedge their exposure to the spot price. Keynes argued that commodities producers tend to be dominant over commodity buyers in the futures markets, thus putting a hedging pressure on the sell side. This situation, where futures prices are lower than expected spot price at delivery, is called "normal backwardation". On the contrary, the situation where futures prices are higher than expected spot price at delivery is called "contango".

## Bonds

Bonds carry cannot be computed precisely using the term structure of futures contracts as the underlyings of each contract can feature different characteristics. This is due to the fact that futures contracts on bonds are generally bound to the bond which is the "Cheapest To Deliver" among a basket of eligible bonds, so underlying bonds can have different coupons and residual maturities for different contracts.

As a consequence, we fall back to the direct method, using yield curves for each country. Consitently with the general definition, we calculate bonds futures carry as the cost or the gain that would be incurred if the yield curve stayed exactly the same. Carry is, in theory, the cost of hedging *physically* a short position on a futures contract. For a future contract on government debt, it has three terms: 

* the cost of borrowing (to borrow the capital to buy the actual security for future delivery), 
* the coupon paid (which is paid to the current owner of the bond and not to the holder of the futures contract) 
* and the change of market value of the bond as time passes (which is not zero even if the yield curve is unchanged).

{: .collapsible}
#### Detailed calculation

We use continuous compounding formulas, which are in our view simpler that discrete ones, to compute the market value of a bond. We calculate the market price of a bond as:

$$ P(N, T, c, y) = N.e^{-y.T}+\frac{c.N}{y}.(1-e^{-y.T}) $$

where $$N$$ is the face value, $$T$$ the residual maturity, $$c$$ the coupon and $$y$$ the yield rate. This formula is basically the sum of the present value of the face value and the present value of remaining coupon payments. Considering a face value equal to 1, the above formula becomes even simpler:

$$ P(T, c, y) = e^{-y.T}+\frac{c}{y}.(1-e^{-y.T}) $$

To calculate carry for a maturity $$T$$ years, we consider two points in time:
* now, when the underlying bond has a maturity of $$T+\Delta$$ where $$\Delta = \it 1\space month$$ and
* one month from now, when the underlying bond as a maturity of $$T$$.

We interpolate the yield curve to get the yield rate $$y_T$$ as a function of maturity $$T$$.

The annualized carry is then:

$$ carry = \left(\frac{P(T, c, y_T)+c.\Delta}{P(T+\Delta, c, y_{T+\Delta})}-r.\Delta\right)^{\frac{1}{\Delta}}-1 $$

where $$\Delta = \it 1\space month$$ and $$r$$ is the short term risk free rate (used as a proxy for the cost of financing).

Using publically available data for constant maturity bond yield, we do not know the coupon value of the underlying bond for each contract. For simplicity, we consider that the coupon is equal to the yield rate $$y_{T+\Delta}$$. Thus it means that the bond is currently trading at par and its value is equal to $$1$$, so the formula becomes:

$$ carry = \left(e^{-y_T.T}+\frac{y_{T+\Delta}}{y}.(1-e^{-y_T.T})+c.\Delta-r.\Delta\right)^{\frac{1}{\Delta}}-1 $$

## Equity

Equity carry may be the least straightforward of all, as the gain or loss incurred when "market conditions remain unchanged" is more difficult to assess. In theory, futures contracts on equity indexes are priced taking into account the dividends (because dividends are paid to the holder of the security and not to the holder of the futures contract) and financing cost. The implied yield of futures contracts on equity indexes calculated using the indirect method described previously is then equal to the difference between the expected dividend yield and the financing cost.

As such, one could take this value as the carry of a futures contract on an equity index. We claim however that the inverse of Price/Earnings ratio, minus financing costs, fits better our idea of expected return, *everything else being equal*. This is because corporate earnings end up either distributed as dividends or in the balance sheet, resulting in a higher equity value and thus a price appreciation. This question is however a matter of choice, as *carry* in equity index futures is quite a subjective concept.

P/E ratio are not widely available for world equity indexes, so we consider for the sake of simplicity a constant Earnings / dividend yield ratio of 50 %. As a consequence, we calculate carry using only the implied yield of futures contracts and the short term rate (as a proxy for financing cost).

For most world equity indexes, dividends feature strong seasonal patterns. To overcome this, we use a 12-month moving average of expected dividends.

{: .collapsible}
#### Detailed calculation

First, we calculate implied diviend yield $$d$$ using the settlement prices of front and deferred contracts and the risk free rate as a proxy of the financing cost:

$$d=\left(\frac{p_{t_1}}{p_{t_2}}\right)^{\frac{1}{t_2-t_1}}-1+r$$

where $$p_{t_1}$$ and $$p_{t_2}$$ are the settlement prices of front and deferred contracts and $$r$$ is the short term risk free rate.

Then, we calculate carry as:

$$carry=\frac{d}{50\%}-r=2d-r$$

which gives:

$$carry=2.\left(\frac{p_{t_1}}{p_{t_2}}\right)^{\frac{1}{t_2-t_1}}-2+r$$