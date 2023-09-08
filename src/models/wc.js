import { round } from "../utilities/utilities.js";

/**
 * Calculates the Wind Chill Index (WCI) in accordance with the ASHRAE 2017 Handbook Fundamentals - Chapter 9 [18]_.
 *
 * @public
 * @memberof models
 * @docname Wind chill index
 *
 * @param {number} tdb - dry bulb air temperature,[°C]
 * @param {number} v - wind speed 10m above ground level, [m/s]
 * @param {object} [kwargs] (Optional) Other parameters.
 * @param {boolean} [kwargs.round=true] - If True rounds output value, if False it does not round it.
 * @returns {{wci: number}} wind chill index, [W/m2]
 */
export function wc(tdb, v, kwargs = { round: true }) {
  let wci = (10.45 + 10 * Math.pow(v, 0.5) - v) * (33 - tdb);
  // the factor 1.163 is used to convert to W/m2
  wci = wci * 1.163;
  if (kwargs.round) {
    wci = round(wci, 1);
  }
  return { wci: wci };
}
